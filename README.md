# bank-of-america

[![CircleCI](https://circleci.com/gh/Tufin/bank-of-america.svg?style=shield&circle-token=dadfdb30201b7acdcfe4c91a2670536bd937c188)](https://circleci.com/gh/Tufin/bank-of-america)
[![Docker](https://img.shields.io/docker/pulls/tufinim/bank-of-america.svg)](https://hub.docker.com/r/tufinim/bank-of-america/)
[![Tufin](http://tufinim.hopto.org/tufin/bank-of-america/badges)](http://tufinim.hopto.org/cia/tufin/bank-of-america/scans/last)

#### Deploy on _Docker Swarm_
Bank of America SaaS
```
docker deploy --compose-file docker-compose-saas.yml BOA_SaaS
```
Bank of America on-premise
```
docker deploy --compose-file docker-compose.yml BOA
```
Delete stack
```
docker stack rm BOA
```

#### REST API - Customer
Health

HTTP GET `/`

Create Account

HTTP POST `/accounts/{account-id}`

#### REST API - Admin
Get all accounts

HTTP GET `/accounts`