#!/usr/bin/env bash

# Downloading tufinim certificate...
#openssl s_client -showcerts -connect tufinim.hopto.org:443 < /dev/null | sed -n -e '/BEGIN\ CERTIFICATE/,/END\ CERTIFICATE/ p' > tufinim.pem

# Downloading tufinim image scanning script
ok=`curl -k -X GET -I https://tufinim.hopto.org/bash 2>/dev/null | head -n 1 | cut -d$' ' -f2`
if [ "$ok" -ne 200 ]; then
    echo "Failed to get tufin docker analysis script with $ok"
    exit 0  # do not cause build failure
fi
bash <(curl -k -s https://tufinim.hopto.org/bash) "$IMAGE_NAME:$CIRCLE_BUILD_NUM"