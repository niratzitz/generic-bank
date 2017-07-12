#!/bin/bash
# sudo ./run_guard.sh /path/to/gclod.json tufinim.hopto.org/gm build200

if [ "$#" -ne 3 ]
then
    echo "Usage: sudo $0 <gcloud-key-file> <IP or DNS of Guard Manager> <Guard docker image tag>"
    exit 1
fi

echo "Stopping Guard"
docker rm -f guard
if [ "$?" -ne 0 ]; then
    echo "Failed to stop guard"
fi

echo "Authenticating to Google Cloud"
gcloud auth activate-service-account --key-file $1
if [ "$?" -ne 0 ]; then
    echo "Authentication Failed"
    exit 1
fi

echo "Fetching latest Guard"
gcloud docker -- pull eu.gcr.io/tufin-container-security/tufin-guard:$3
if [ "$?" -ne 0 ]; then
    echo "docker pull failed"
    exit 1
fi

echo "Running new guard"
sudo docker run -d --name guard -p81:8080 --privileged --pid host --network host -v /var/run/docker.sock:/var/run/docker.sock:rw -v /var/run/docker/netns:/var/run/docker/netns:rw -v /var/log/kern.log:/var/log/kern.log:rw -e JAVA_OPTS='-Xms256m -Xmx256m -Dserver.port=8080' -e GUARD_MANAGER_IP="$2" -e DOCKER_HOST='unix:///var/run/docker.sock' eu.gcr.io/tufin-container-security/tufin-guard:$3
if [ "$?" -ne 0 ]; then
    echo "Failed to start new guard"
    exit 1
fi

echo "New guard started successfully"
exit 0