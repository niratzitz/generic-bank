#!/usr/bin/env bash

git pull
cat Dockerfile.ubuntu > Dockerfile
git add Dockerfile
git commit Dockerfile -m 'F Security Score'
git push

