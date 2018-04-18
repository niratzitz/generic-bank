#!/usr/bin/env bash

cat Dockerfile.ubuntu > Dockerfile
git add Dockerfile
git commit Dockerfile -m 'F Security Score'
git push

