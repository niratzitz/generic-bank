#!/usr/bin/env bash

echo $GCLOUD_SERVICE_KEY | base64 --decode --ignore-garbage > ${GOOGLE_APPLICATION_CREDENTIALS}
docker run --rm -v "$PWD":/work -w /work -e GCLOUD_CREDENTIALS=${GOOGLE_APPLICATION_CREDENTIALS} tufinim/gcloud-sdk /script/kube_update_deployment_image.sh ${GCLOUD_PROJECT_ID} ${GCLOUD_CLUSTER_NAME} ${GCLOUD_ZONE1} deployment/admin admin=${IMAGE_NAME}:${CIRCLE_BUILD_NUM}
if [ $? -ne 0 ];
then
    echo "Failed to update image on google cloud"
fi

exit 0 # build would not fail if deployment failed
