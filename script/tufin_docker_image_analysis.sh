#!/usr/bin/env bash

# Downloading tufin certificate...
#openssl s_client -showcerts -connect tufinim.hopto.org:443 < /dev/null | sed -n -e '/BEGIN\ CERTIFICATE/,/END\ CERTIFICATE/ p' > tufinim.pem

# Downloading tufin image scanning script
tufin_scan_url=https://${TUFIN_HOST}/api/scripts/image-scan
ok=`curl -X GET -I $tufin_scan_url 2>/dev/null | head -n 1 | cut -d$' ' -f2`
if [ "$ok" -ne 200 ]
then
    echo "Failed to get tufin docker analysis script with $ok"
    exit 0  # do not cause build failure
fi
bash <(curl -s $tufin_scan_url) "$IMAGE_NAME:$CIRCLE_BUILD_NUM"
