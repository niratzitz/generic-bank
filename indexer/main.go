package main

import (
	log "github.com/Sirupsen/logrus"
	"github.com/go-redis/redis"
	"github.com/tufin/bank-of-america/indexer/common"

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
			log.Infof("Redis key '%s' fetched", key)
			if ok, err := redisClient.Del(key).Result(); ok == 1 && err == nil {
				log.Infof("Redis key '%s' deleted", key)
			}
			ms := rand.Int31n(3000)
			log.Infof("Indexer is going to sleep %dms", ms)
			time.Sleep(time.Duration(ms) * time.Millisecond)
		}
	}()

	<-stop

	redisClient.Close()
	pgClient.Close()

	log.Info("Bank of America Indexer has been stopped")
}
