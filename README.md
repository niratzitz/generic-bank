# bank-of-america

[![CircleCI](https://circleci.com/gh/Tufin/bank-of-america.svg?style=shield&circle-token=dadfdb30201b7acdcfe4c91a2670536bd937c188)](https://circleci.com/gh/Tufin/bank-of-america)
[![Docker](https://img.shields.io/docker/pulls/tufinim/bank-of-america.svg)](https://hub.docker.com/r/tufinim/bank-of-america/)
[![Tufin](http://tufinim.hopto.org/tufin/bank-of-america/badges)](http://tufinim.hopto.org/cia/tufin/bank-of-america/scans/last)

#### Deploy on _Docker Swarm_
Redis
```
sudo docker service create --replicas 1 --name redis-boa -p 6379:6379 redis:3.2-alpine
```
Bank of America
```
sudo docker service create --replicas 2 --name bank-of-america -p 8085:8085 tufinim/bank-of-america
```

#### REST API
Health

HTTP GET `/`

Create Account

HTTP POST `/accounts/{account-id}`