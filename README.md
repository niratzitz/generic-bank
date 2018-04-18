# bank-of-america
[![CircleCI](https://circleci.com/gh/Tufin/bank-of-america.svg?style=shield&circle-token=dadfdb30201b7acdcfe4c91a2670536bd937c188)](https://circleci.com/gh/Tufin/bank-of-america)
[![Docker](https://img.shields.io/docker/pulls/tufinim/bank-of-america.svg)](https://hub.docker.com/r/tufinim/bank-of-america/)
[![Tufin](https://lightorca.tufin.io/cia/bank-of-america/word-trading/badges?image=tufinim/bank-of-america)](https://orca.tufin.io/ui/#/grid/scans/tufinim%2Fbank-of-america)

Demo Banking App

[![BankOfAmerica](https://static.seekingalpha.com/uploads/2017/7/1/15103192-14988942864352787.png)](https://www.bankofamerica.com/)

![BofA Diagram](https://github.com/Tufin/bank-of-america/blob/master/BofA%20Diagram.png)

#### Deploy on _Kubernetes_
Bank of America SaaS
```
docker stack deploy --compose-file docker-compose-saas.yml BOA_SaaS
```
Bank of America on-premise
```
docker stack deploy --compose-file docker-compose.yml BOA
```
Delete stack
```
docker stack rm BOA
```

#### REST API - Customer
Portal

HTTP GET `/boa/customer/index.html`

Create Account

HTTP POST `/accounts/{account-id}`

#### REST API - Admin
Portal

HTTP GET `/boa/admin/index.html`

Get all accounts

HTTP GET `/boa/admin/accounts` 

#### Build
```
$ docker run -it --rm -v "$PWD":/go/src/github.com/tufin/bank-of-america -w /go/src/github.com/tufin/bank-of-america tufinim/go-build bash
$ dep ensure
```
