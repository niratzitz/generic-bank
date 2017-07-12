package common

import (
	log "github.com/Sirupsen/logrus"
	"github.com/go-redis/redis"

	"os"
)

func CreateRedisClient() *redis.Client {

	address := os.Getenv("REDIS")
	if address == "" {
		address = "redis-boa:6379"
	}
	ret := redis.NewClient(&redis.Options{
		Addr:     address,
		Password: "", // no password set
		DB:       0,  // use default DB
	})
	_, err := ret.Ping().Result()
	if err != nil {
		log.Fatal("Failed to ping redis. ", err)
	}
	log.Infof("Redis client created (%s)", address)

	return ret
}
