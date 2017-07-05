# bank-of-america

[![CircleCI](https://circleci.com/gh/Tufin/bank-of-america.svg?style=shield&circle-token=dadfdb30201b7acdcfe4c91a2670536bd937c188)](https://circleci.com/gh/Tufin/bank-of-america)
[![Docker](https://img.shields.io/docker/pulls/tufinim/bank-of-america.svg)](https://hub.docker.com/r/tufinim/bank-of-america/)
[![Tufin](http://tufinim.hopto.org/tufin/bank-of-america/badges)](http://tufinim.hopto.org/cia/tufin/bank-of-america/scans/last)

#### Deploy on _Docker Swarm_
```
sudo docker service create --replicas 2 --name Bank-of-america --publish 8085:8085 tufinim/bank-of-america
```