#!/bin/bash

if [[ $# -ne 1 ]]; then
    echo "Usage: $0 number-of-subnets"
    exit 1
fi

number=${1}

for (( c = 0; c < $number; c++ ))
do
   name=`./random-word-generator.sh 1 | sed "s/'s//g"`
   echo "Creating cluster: "$name
   gcloud container clusters create $name --zone=europe-west1-b --num-nodes=1 --machine-type=n1-standard-2 --cluster-version=latest --preemptible --async --cluster-ipv4-cidr=10.12.0.0/16
done

# for i in {1..20}; do gcloud container clusters get-credentials cluster$i; ./deploy.sh <key> ; done
# for i in {1..20}; do gcloud container clusters get-credentials cluster$i; kubectl describe ingress|grep Address ; done

