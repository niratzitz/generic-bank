# Generic-Bank - a demo app for Kubernetes
[![CircleCI](https://circleci.com/gh/Tufin/generic-bank.svg?style=shield&circle-token=dadfdb30201b7acdcfe4c91a2670536bd937c188)](https://circleci.com/gh/Tufin/generic-bank)
[![Tufin](https://orca.tufin.io/api/generic-bank/retail/badges/security-score?image=tufinim/generic-bank:cia-latest&token=7795db57-9633-4dc6-acb4-8acf118104c9)](https://orca.tufin.io/ui/#/generic-bank/retail/grid/scans?image=tufinim%2Fgeneric-bank)

## Deploy

To deploy into your Kubernetes cluster run:
```
./deploy <timezonedb token>
```
To get a timezonedb token, go to https://timezonedb.com/register

## Remove
To remove from your Kubernetes cluster run:
```
./remove
```

## DevSecOps with Tufin Orca
This app demonstrates [Tufin Orca](https://www.tufin.com/tryorca) security integration into the CI/CD pipeline (DevSecOps):
- The security score badge in Github reflects the scan result of the latest image scan by Orca
- Click the build status badge to see how the scan is integrated into CircleCI (or any other CI for that matter)
- Click the security score badge to see the CVEs in Tufin Orca (requires an account)

You can [create your own Orca account](https://www.tufin.com/tryorca) and scan your own images in the pipeline (and in run-time).

## Generic Bank Architecture

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


##### Archive:
[![Jenkins](http://104.155.103.55/buildStatus/icon?job=admin)](http://104.155.103.55/job/admin/)
