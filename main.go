package main

import (
	log "github.com/Sirupsen/logrus"
	"github.com/go-redis/redis"
	"github.com/gorilla/mux"

	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"os/signal"
)

var redisClient *redis.Client

type Account struct {
	Id      string `json:"id"`
	Balance int    `json:"balance"`
}

func main() {

	stop := make(chan os.Signal)
	signal.Notify(stop, os.Interrupt)

	redisClient = createRedisClient()

	router := mux.NewRouter()
	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprint(w, "This is America")
	}).Methods(http.MethodGet)
	router.HandleFunc("/accounts/{account-id}", addAccount).Methods(http.MethodPost)
	go func() {
		log.Info("Bank of America Server listening on port 8085")
		if err := http.ListenAndServe(":8085", router); err != nil {
			log.Error("Bank of America Server Interapted. ", err)
		}
	}()

	<-stop // wait for SIGINT
	log.Info("Bank of America Server has been stopped")
}

func addAccount(w http.ResponseWriter, r *http.Request) {

	id := mux.Vars(r)["account-id"]
	log.Infof("Creating account %s", id)
	account, err := json.Marshal(NewAccount(id))
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
	log.Infof("Account %s has been created", id)
}
func NewAccount(id string) Account {

	return Account{Id: id, Balance: 0}
}

func createRedisClient() *redis.Client {

	ret := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})
	_, err := ret.Ping().Result()
	if err != nil {
		log.Fatal("Failed to ping redis. ", err)
	}

	return ret
}
