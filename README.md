# generic bank
[![CircleCI](https://circleci.com/gh/Tufin/generic-bank.svg?style=shield&circle-token=dadfdb30201b7acdcfe4c91a2670536bd937c188)](https://circleci.com/gh/Tufin/generic-bank)
[![Tufin](https://orca.tufin.io/ui/#/generic-bank/retail/grid/scans?image=tufinim%2Fgeneric-bank:latest&token=7795db57-9633-4dc6-acb4-8acf118104c9)](https://orca.tufin.io/ui/#/generic-bank/retail/grid/scans?image=tufinim%2Fgeneric-bank)

Demo Banking App

![Generic Bank Diagram](https://github.com/Tufin/generic-bank/blob/master/Generic%20Bank%20Diagram.png)


#### Deploy into Kubernetes
```
./deploy <timezonedb token>
```
To get a timezonedb token, go to https://timezonedb.com/register

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


##### Archive:
[![Jenkins](http://104.155.103.55/buildStatus/icon?job=admin)](http://104.155.103.55/job/admin/)
