# Generic-Bank - a demo app for Kubernetes
[![CircleCI](https://circleci.com/gh/Tufin/generic-bank.svg?style=shield&circle-token=dadfdb30201b7acdcfe4c91a2670536bd937c188)](https://circleci.com/gh/Tufin/generic-bank)
[![Tufin](https://orca.tufin.io/api/generic-bank/retail/badges/security-score?image=tufinim/generic-bank:cia-latest&token=e553be1e-dfa5-43a5-8807-efd91685c0df)](https://orca.tufin.io/ui/#/generic-bank/retail/grid/scans?image=tufinim%2Fgeneric-bank)

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
- Click the build status badge to see how the scan is integrated into CircleCI (or any other CI for that matter)  
[![CircleCI](https://circleci.com/gh/Tufin/generic-bank.svg?style=shield&circle-token=dadfdb30201b7acdcfe4c91a2670536bd937c188)](https://circleci.com/gh/Tufin/generic-bank)

- The security score badge in Github reflects the scan result of the latest image scan by Orca. Click the security score badge to see the CVEs in Tufin Orca (requires an account)  
[![Tufin](https://orca.tufin.io/api/generic-bank/retail/badges/security-score?image=tufinim/generic-bank:cia-latest&token=7795db57-9633-4dc6-acb4-8acf118104c9)](https://orca.tufin.io/ui/#/generic-bank/retail/grid/scans?image=tufinim%2Fgeneric-bank)

You can [create your own Orca account](https://www.tufin.com/tryorca) and scan your own images in the pipeline (and in run-time).

## Generic Bank Architecture

![Generic Bank Diagram](https://github.com/Tufin/generic-bank/blob/master/Generic%20Bank%20Diagram.png)


#### REST API - Customer
Portal

HTTP GET `/customer/`

Create Account

HTTP POST `/accounts/{account-id}`

Get Balance

HTTP GET `/balance`

#### REST API - Admin
Portal

HTTP GET `/admin/`

Get all accounts

HTTP GET `/boa/admin/accounts` 

Get Time

HTTP GET `/time?zone=Asia/Jerusalem`

