package main

import (
	log "github.com/Sirupsen/logrus"
	"github.com/go-redis/redis"
	"github.com/gorilla/mux"
	"github.com/tufin/bank-of-america/common"

	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"os/signal"
)

var redisClient *redis.Client

func main() {

	stop := make(chan os.Signal)
	signal.Notify(stop, os.Interrupt)

	redisClient = common.CreateRedisClient()
	defer redisClient.Close()

	router := mux.NewRouter()
	router.HandleFunc("/redis/{key}", getRedisKey).Methods(http.MethodGet)
	router.HandleFunc("/accounts/{account-id}", createAccount).Methods(http.MethodPost)
	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprint(w, "This is America")
	}).Methods(http.MethodGet)

	dbProxy := NewReverseProxy(getDBUrl())
	router.PathPrefix("/db").HandlerFunc(dbProxy.Handle)

	go func() {
		log.Info("Bank of America Server listening on port 8085")
		if err := http.ListenAndServe(":8085", router); err != nil {
			log.Error("Bank of America Server Interrupted. ", err)
		}
	}()

	<-stop // wait for SIGINT
	log.Info("Bank of America Server has been stopped")
}

func getDBUrl() string {

	ret := os.Getenv("DB_URL")
	if ret == "" {
		ret = "http://localhost:8088"
	}
	log.Info("DB URL: ", ret)

	return ret
}

type ReverseProxy struct {
	target *url.URL
	proxy  *httputil.ReverseProxy
}

func NewReverseProxy(target string) ReverseProxy {

	targetUrl, err := url.Parse(target)
	if err != nil {
		log.Fatal(err)
	}

	return ReverseProxy{target: targetUrl, proxy: httputil.NewSingleHostReverseProxy(targetUrl)}
}

func (p ReverseProxy) Handle(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("X-GoProxy", "GoProxy")
	p.proxy.ServeHTTP(w, r)
}

func getRedisKey(w http.ResponseWriter, r *http.Request) {

	key := mux.Vars(r)["key"]
	value := redisClient.Get(key)
	if value.Val() == "" {
		fmt.Fprintf(w, "Redis key '%s' not found", key)
		w.WriteHeader(http.StatusNotFound)
	} else {
		fmt.Fprint(w, value.Val())
	}
}

func createAccount(w http.ResponseWriter, r *http.Request) {

	id := mux.Vars(r)["account-id"]
	log.Infof("Creating account '%s' in redis", id)
	account, err := json.Marshal(common.NewAccount(id))
	if err != nil {
		log.Errorf("Failed to convert account id: '%s' to json with %v", id, err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err = redisClient.Set(id, account, 0).Err()
	if err != nil {
		log.Errorf("Failed to add key id: '%s' to redis with %v", id, err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	log.Infof("Account '%s' added to redis", id)
}
