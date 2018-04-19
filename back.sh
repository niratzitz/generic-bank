#!/usr/bin/env bash

git pull
cat Dockerfile.ubuntu > Dockerfile
git add Dockerfile
git commit Dockerfile -m 'Moving to Tufin F Security Score'
git push

