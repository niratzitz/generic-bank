#!/bin/bash

get_cluster_name() {
    name=""
    regex1="^[-a-z0-9]{1,40}$"
    regex2="^[a-z].*[a-z0-9]$"
    while ! [[ $name =~ $regex1 && $name =~ $regex2 ]]; do
        name=`./random-word-generator.sh 1`
    done
}

if [[ $# -ne 1 ]]; then
    echo "Usage: $0 number-of-clusters"
    exit 1
fi

number=${1}

for (( c = 0; c < $number; c++ ))
do
   get_cluster_name
   echo "Creating cluster: "$name
   gcloud container clusters create $name --zone=europe-west1-b --num-nodes=1 --machine-type=n1-standard-2 --cluster-version=latest --preemptible --async --cluster-ipv4-cidr=10.$c.0.0/16
done

# for f in `gcloud container clusters list|cut -f1 -d" "`; do if gcloud container clusters get-credentials $f; then ./deploy.sh <key> ;fi ;  done
# for i in `gcloud container clusters list|cut -f1 -d" "`; kubectl describe ingress|grep Address ; done
