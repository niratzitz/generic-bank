package main

import (
	log "github.com/Sirupsen/logrus"
	"github.com/gorilla/mux"

	"fmt"
	"net/http"
	"os"
	"os/signal"
)

func main() {

	stop := make(chan os.Signal)
	signal.Notify(stop, os.Interrupt)

	router := mux.NewRouter()
	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprint(w, "This is Aerica")
	}).Methods(http.MethodGet)
	go func() {
		log.Info("Bank of America Server listening on port 8085")
		if err := http.ListenAndServe(":8085", router); err != nil {
			log.Error("Bank of America Server Interapted. ", err)
		}
	}()

	<-stop // wait for SIGINT
	log.Info("Bank of America Server has been stopped")
}
