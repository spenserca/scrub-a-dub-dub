#!/usr/bin/env bash

set -e

stackName=
profile=

while [ $# -gt 0 ]; do
  if [[ $1 == *"--"* ]]; then
    param="${1/--/}"
    declare $param="$2"
  fi

  shift
done

if [ -z "$stackName" ]; then echo "[ERROR] Please pass a stack name with --stackName"; exit 1; fi
if [ -z "$profile" ]; then echo "[ERROR] Please pass a profile with --profile"; exit 1; fi

echo "Deleting pipeline stack $stackName"
aws cloudformation delete-stack \
  --stack-name $stackName \
  --profile $profile
