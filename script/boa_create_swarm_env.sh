#!/usr/bin/env bash

### AWS cluster ###

# bank of america network
sudo docker network create --driver overlay boanet

# redis
sudo docker service create --replicas 1 --name redis-boa -p 6379:6379 --network boanet redis:3.2-alpine

# bank of america
sudo docker service create --replicas 1 --name bank-of-america -p 8085:8085 --network boanet tufinim/bank-of-america

### AWS cluster ###


### on-premise cluster ###

# bank of america network
sudo docker network create --driver overlay boanetop

# postgres
sudo docker service create --replicas 1 --name postgres-boa -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=123 -p 5432:5432 --network boanetop postgres

# indexer
sudo docker service create --replicas 1 --name boa-indexer -e REDIS=10.10.251.7:6379 --network boanetop tufinim/bank-of-america-indexer

# admin
sudo docker service create --replicas 1 --name boa-admin -e POSTGRES=postgres-boa -e MODE=admin --network boanetop tufinim/bank-of-america