package main

import (
	log "github.com/Sirupsen/logrus"
	"github.com/go-redis/redis"
	"github.com/tufin/bank-of-america/indexer/common"

	"encoding/json"
	"math/rand"
	"os"
	"os/signal"
	"time"
)

var redisClient *redis.Client

func main() {

	stop := make(chan os.Signal)
	signal.Notify(stop, os.Interrupt)

	redisClient = common.CreateRedisClient()
	pgClient := common.NewPostgresClient()
	pgClient.Initialize()

	go func() {
		log.Info("Indexer started")
		for {
			key := redisClient.RandomKey().Val()
			accountJson := redisClient.Get(key).Val()
			if ok, err := redisClient.Del(key).Result(); ok == 1 && err == nil && accountJson != "" {
				log.Infof("Redis key '%s' deleted", key)
				account := common.Account{}
				if err := json.Unmarshal([]byte(accountJson), &account); err != nil {
					log.Error("Failed to convert json account with ", err)
				} else {
					pgClient.InsertAccount(account)
				}
			}
			ms := rand.Int31n(3000)
			time.Sleep(time.Duration(ms) * time.Millisecond)
		}
	}()

	<-stop

	redisClient.Close()
	pgClient.Close()

	log.Info("Bank of America Indexer has been stopped")
}
