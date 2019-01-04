#!/bin/bash

if [[ $# -ne 2 ]]; then
    echo "Usage: $0 from to"
    exit 1
fi

from=${1}
to=${2}

for (( c = $from; c < $to; c++ ))
do
   name=`./random-word-generator.sh 1 | sed "s/'s//g"`
   echo "Creating cluster: "$name
   gcloud container clusters create $name --zone=europe-west1-b --num-nodes=1 --machine-type=n1-standard-2 --cluster-version=latest --preemptible --async 
done

# for i in {1..20}; do gcloud container clusters get-credentials cluster$i; ./deploy.sh <key> ; done
# for i in {1..20}; do gcloud container clusters get-credentials cluster$i; kubectl describe ingress|grep Address ; done

