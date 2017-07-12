#!/usr/bin/env bash

# bank of america network
sudo docker network inspect boanet

# redis
sudo docker service create --replicas 1 --name redis-boa -p 6379:6379 --network boanet redis:3.2-alpine

# postgres
sudo service create --replicas 1 --name postgres-boa -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=123 -p 5432:5432 --network boanet postgres

# bank of america
sudo docker service create --replicas 1 --name bank-of-america -p 8085:8085 --network boanet tufinim/bank-of-america