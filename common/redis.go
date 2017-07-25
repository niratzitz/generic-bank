package common

import (
	log "github.com/Sirupsen/logrus"
	"github.com/go-redis/redis"

	"os"
	"time"
)

func CreateRedisClient() *redis.Client {

	address := os.Getenv("REDIS")
	if address == "" {
		address = "redis:6379"
	}
	ret := redis.NewClient(&redis.Options{
		Addr:     address,
		Password: "", // no password set
		DB:       0,  // use default DB
	})

	for {
		_, err := ret.Ping().Result()
		if err == nil {
			log.Infof("Redis client created on '%s'", address)
			break
		}
		log.Infof("Failed to ping redis (%s) with %v", address, err)
		time.Sleep(3 * time.Second)
	}

	return ret
}
