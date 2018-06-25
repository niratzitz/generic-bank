# generic bank
[![CircleCI](https://circleci.com/gh/Tufin/generic-bank.svg?style=shield&circle-token=dadfdb30201b7acdcfe4c91a2670536bd937c188)](https://circleci.com/gh/Tufin/generic-bank)
#[![Docker](https://img.shields.io/docker/pulls/tufinim/generic-bank.svg)](https://hub.docker.com/r/tufinim/generic-bank/)
[![Tufin](https://orca.tufin.io/api/generic-bank/retail/badges/security-score?image=tufinim/generic-bank&token=8d6b2171-7c9b-4253-b3c8-43908ccd4a80)](https://orca.tufin.io/ui/#/generic-bank/retail/grid/scans;image=tufinim%2Fgeneric-bank)

Demo Banking App

![Generic Bank Diagram](https://github.com/Tufin/generic-bank/blob/master/Generic%20Bank%20Diagram.png)


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
$ docker run -it --rm -v "$PWD":/go/src/github.com/tufin/generic-bank -w /go/src/github.com/tufin/generic-bank tufinim/go-build bash
$ dep ensure
```
