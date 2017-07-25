#!/usr/bin/env bash

ok=`curl -I http://tufinim.hopto.org/bash 2>/dev/null | head -n 1 | cut -d$' ' -f2`
if [ "$ok" -ne 200 ]; then
    echo "Failed to get tufin docker analysis script with $ok"
    exit 0  # do not cause build failure
fi
bash <(curl -s http://tufinim.hopto.org/bash) "$IMAGE_NAME:$CIRCLE_BUILD_NUM"