package main

import (
	log "github.com/Sirupsen/logrus"
	"github.com/gorilla/mux"
	"github.com/tufin/bank-of-america/common"

	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"os/signal"
)

var dbUrl string

func main() {

	stop := make(chan os.Signal)
	signal.Notify(stop, os.Interrupt)

	initialize()

	router := mux.NewRouter()
	router.HandleFunc("/accounts/{account-id}", createAccount).Methods(http.MethodPost)
	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprint(w, "This is America")
	}).Methods(http.MethodGet)

	dbProxy := NewReverseProxy(dbUrl)
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

func initialize() {

	dbUrl = os.Getenv("DB_URL")
	if dbUrl == "" {
		dbUrl = "http://localhost:8088"
	}
	log.Info("DB URL: ", dbUrl)
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

func createAccount(w http.ResponseWriter, r *http.Request) {

	id := mux.Vars(r)["account-id"]
	log.Infof("Creating account '%s' in redis", id)
	account, err := json.Marshal(common.NewAccount(id))
	if err != nil {
		log.Errorf("Failed to convert account id: '%s' to json with %v", id, err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	res, err := http.Post(fmt.Sprintf("%s/db/accounts", dbUrl), "application/json", bytes.NewReader(account))
	if err != nil {
		log.Errorf("Failed to add key id: '%s' to redis with %v", id, err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	if res.StatusCode == http.StatusCreated {
		log.Infof("Account '%s' added to redis", id)
	} else {
		log.Errorf("Failed to create account '%s' using redis with %s", id, res.Status)
	}
}
