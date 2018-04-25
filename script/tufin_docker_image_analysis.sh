#!/usr/bin/env bash

# Downloading tufin certificate...
#openssl s_client -showcerts -connect tufinim.hopto.org:443 < /dev/null | sed -n -e '/BEGIN\ CERTIFICATE/,/END\ CERTIFICATE/ p' > tufinim.pem

# Downloading tufin image scanning script
ok=`curl -X GET -I https://${TUFIN_HOST}/cia/bash 2>/dev/null | head -n 1 | cut -d$' ' -f2`
if [ "$ok" -ne 200 ]
then
    echo "Failed to get tufin docker analysis script with $ok"
    exit 0  # do not cause build failure
fi
echo "TUFIN_HOST="$TUFIN_HOST
curl -s https://${TUFIN_HOST}/cia/bash ${IMAGE_NAME}:${CIRCLE_BUILD_NUM} | TUFIN_HOST=${TUFIN_HOST} bash
