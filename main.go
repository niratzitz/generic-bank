package main

import (
	log "github.com/Sirupsen/logrus"
	"github.com/go-redis/redis"
	"github.com/gorilla/mux"
	"github.com/tufin/bank-of-america/common"

	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"os/signal"
)

var redisClient *redis.Client
var pgClient common.PostgresClient

func main() {

	stop := make(chan os.Signal)
	signal.Notify(stop, os.Interrupt)

	if os.Getenv("MODE") == "admin" {
		log.Info("Admin mode")
		pgClient = common.NewPostgresClient()
		defer pgClient.Close()
	} else {
		log.Info("Customer mode")
		redisClient = common.CreateRedisClient()
		defer redisClient.Close()
	}

	router := mux.NewRouter()
	router.HandleFunc("/redis/{key}", getRedisKey).Methods(http.MethodGet)
	router.HandleFunc("/accounts", getAccounts).Methods(http.MethodGet)
	router.HandleFunc("/accounts/{account-id}", createAccount).Methods(http.MethodPost)
	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprint(w, "This is America")
	}).Methods(http.MethodGet)
	go func() {
		log.Info("Bank of America Server listening on port 8085")
		if err := http.ListenAndServe(":8085", router); err != nil {
			log.Error("Bank of America Server Interrupted. ", err)
		}
	}()

	<-stop // wait for SIGINT
	log.Info("Bank of America Server has been stopped")
}

func getAccounts(w http.ResponseWriter, r *http.Request) {

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(pgClient.GetAccounts())
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
		log.Errorf("Failed to convert account id: '%s' to json with '%v'", id, err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	err = redisClient.Set(id, account, 0).Err()
	if err != nil {
		log.Errorf("Failed to add key id: '%s' to redis with '%v'", id, err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	log.Infof("Account '%s' has been added to redis", id)
	w.WriteHeader(http.StatusCreated)
}
