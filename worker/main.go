package main

import (
	log "github.com/Sirupsen/logrus"
	
	"os"
	"os/signal"
)

func main() {

	stop := make(chan os.Signal)
	signal.Notify(stop, os.Interrupt)

	go func() {
		log.Info("Worker started")
		for {
			break
		}
	}()

	<-stop
	log.Info("Bank of America Worker has been stopped")
}
