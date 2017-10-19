# bank-of-america

[![CircleCI](https://circleci.com/gh/Tufin/bank-of-america.svg?style=shield&circle-token=dadfdb30201b7acdcfe4c91a2670536bd937c188)](https://circleci.com/gh/Tufin/bank-of-america)
[![Docker](https://img.shields.io/docker/pulls/tufinim/bank-of-america.svg)](https://hub.docker.com/r/tufinim/bank-of-america/)
[![Tufin](http://tufinim.hopto.org/bank-of-america/retail/badges?image=tufinim/bank-of-america)](https://tufinim.hopto.org/#/grid/scans/tufinim%2Fbank-of-america)


[![BankOfAmerica](https://static.seekingalpha.com/uploads/2017/7/1/15103192-14988942864352787.png)](https://www.bankofamerica.com/)

Demo Banking App

#### Deploy on _Docker Swarm_
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
