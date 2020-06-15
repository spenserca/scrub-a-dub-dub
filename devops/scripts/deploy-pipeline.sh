#!/usr/bin/env bash

set -e

artifactStore=
encryptionKeyAlias=
scmOwner=
repository=
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
if [ -z "$repository" ]; then echo "[ERROR] Please pass a repository with --repository"; exit 1; fi
if [ -z "$profile" ]; then echo "[ERROR] Please pass a profile with --profile"; exit 1; fi
if [ -z "$artifactStore" ]; then echo "[ERROR] Please pass an artifact store with --artifactStore"; exit 1; fi
if [ -z "$encryptionKeyAlias" ]; then echo "[ERROR] Please pass an encryption key alias with --encryptionKeyAlias"; exit 1; fi
if [ -z "$scmOwner" ]; then echo "[ERROR] Please pass an scm owner with --scmOwner"; exit 1; fi

echo $stackName $repository

echo "Verifying pipeline cloudformation template for $stackName"
aws cloudformation validate-template \
  --template-body file://./devops/cloudformation/pipeline.yml \
  --profile $profile

echo "Deploying pipeline stack $stackName"
aws cloudformation deploy --stack-name $stackName \
  --template-file devops/cloudformation/pipeline.yml \
  --parameter-overrides ArtifactStore="$artifactStore" \
    EncryptionKeyAlias="$encryptionKeyAlias" \
    Repository="$repository" \
    SCMOwner="$scmOwner" \
  --profile $profile \
  --no-fail-on-empty-changeset
