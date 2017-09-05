package main

import (
	log "github.com/Sirupsen/logrus"
	"github.com/gorilla/mux"
	"github.com/tufin/bank-of-america/common"

	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"bytes"
)

var redis string
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
	}

	redis = getRedisUrl()

	router := mux.NewRouter()
	router.HandleFunc("/accounts", getAccounts).Methods(http.MethodGet)
	router.HandleFunc("/accounts/{account-id}", createAccount).Methods(http.MethodPost)
	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprint(w, "This is America")
	}).Methods(http.MethodGet)
	go func() {
		log.Info("Bank of America Server listening on port 8085")
		if err := http.ListenAndServe(":8085", router); err != nil {
			log.Error("Bank of America Server interrupted. ", err)
		}
	}()

	<-stop // wait for SIGINT
	log.Info("Bank of America Server has been stopped")
}

func getRedisUrl() string {

	ret := os.Getenv("REDIS")
	if ret == "" {
		ret = "http://redis"
	}
	log.Infof("Redis: %s", ret)

	return ret
}

func getAccounts(w http.ResponseWriter, r *http.Request) {

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(pgClient.GetAccounts())
}

func createAccount(w http.ResponseWriter, r *http.Request) {

	id := mux.Vars(r)["account-id"]
	url := fmt.Sprintf("%s/accounts", redis)
	log.Infof("Creating account '%s' in redis (%s)", id, url)
	account, err := json.Marshal(common.NewAccount(id))
	if err != nil {
		msg := fmt.Sprintf("Failed to convert account id: '%s' to json with '%v'", id, err)
		log.Error(msg)
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprint(w, msg)
		return
	}
	response, err := http.Post(url, "application/json", bytes.NewReader(account))
	if err != nil {
		log.Errorf("Failed to add key '%s' to redis with '%v'", id, err)
		w.WriteHeader(http.StatusInternalServerError)
	} else if response.StatusCode != http.StatusOK {
		log.Errorf("Failed to add key '%s' to redis with status '%s' (%#v)", id, response.Status, response)
		w.WriteHeader(response.StatusCode)
	} else {
		msg := fmt.Sprintf("Account '%s' has been added to redis", id)
		log.Infof(msg)
		w.WriteHeader(http.StatusCreated)
		fmt.Fprint(w, msg)
	}
}
