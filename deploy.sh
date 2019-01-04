#!/usr/bin/env bash

main() {
    TIMEZONEDB_API_KEY=${1:-$TIMEZONEDB_API_KEY}

    [[ -z "$TIMEZONEDB_API_KEY" ]] && echo "'TIMEZONEDB_API_KEY' is missing!" && exit 1

    local svc_type='NodePort'

    # Redis
    echo "Deploying Redis..."
    kubectl create -f aut/deployment/db/aut_redis.yaml
    kubectl create -f aut/deployment/db/aut_redis_svc.yaml

    # PostgreSQL
    echo "Deploying PostgreSQL..."
    kubectl create -f aut/deployment/db/aut_postgres.yaml
    kubectl create -f aut/deployment/db/aut_postgres_svc.yaml

    # Customer
    echo "Deploying Customers Service..."
    kubectl create -f aut/deployment/customer/aut_customer.yaml

    # Indexer
    echo "Deploying Indexer..."
    kubectl create -f aut/deployment/indexer/aut_indexer.yaml
    kubectl create -f aut/deployment/indexer/aut_indexer_svc.yaml

    # Time
    timezonedb_api_key=`echo $TIMEZONEDB_API_KEY | base64`
    sed -e 's/#TIMEZONEDB_API_KEY#/'"$timezonedb_api_key"'/g' \
    aut/deployment/time/aut_time_template.yaml > aut/deployment/time/aut_time.yaml

    echo "Deploying Time Service..."
    kubectl create -f aut/deployment/time/aut_time.yaml
    kubectl create -f aut/deployment/time/aut_time_svc.yaml

    # Balance
    echo "Deploying Balance Service..."
    kubectl create -f aut/deployment/balance/aut_balance.yaml
    kubectl create -f aut/deployment/balance/aut_balance_svc.yaml

    # Admin
    echo "Deploying Admin Service..."
    kubectl create -f aut/deployment/admin/aut_admin.yaml

    # Maintenance
    echo "Deploying Maintenance Service..."
    kubectl create -f aut/deployment/maintenance/aut_maintenance.yaml
    kubectl create -f aut/deployment/maintenance/aut_maintenance_svc.yaml

    # Ingress
    kubectl create -f aut/deployment/ingress/ingress_gce.yaml

    echo "Configuring service type for the exposed services..."
    sed -e 's/#SVC_TYPE#/'"$svc_type"'/g' \
    aut/deployment/admin/aut_admin_svc_template.yaml > aut/deployment/admin/aut_admin_svc.yaml
    sed -e 's/#SVC_TYPE#/'"$svc_type"'/g' \
    aut/deployment/customer/aut_customer_svc_template.yaml > aut/deployment/customer/aut_customer_svc.yaml

    echo "Deploying admin Service..."
    kubectl create -f aut/deployment/admin/aut_admin_svc.yaml
    echo "Deploying customer Service..."
    kubectl create -f aut/deployment/customer/aut_customer_svc.yaml
}

main $@