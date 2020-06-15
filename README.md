# scrub-a-dub-dub

A utility for marking object properties for data sanitization

## Getting Started

### CI/CD Pipeline

Deploy the pipeline

1. Push this code to the master branch of your repository
1. Run the script `devops/scripts/deploy-pipeline.sh`
   1. with your artifact store `--artifactStore <your artifact store>`
   1. with your encryption key `--kmsKey <alias/encryption_key_alias>`
   1. with your repository `--repository <your repo>`
   1. with your scm owner `--scmOwner <your scm owner>`
   1. with your deployed stack name `--stackName <your stackname>`
   1. with your aws profile `--profile <your profile>`
1. The pipeline should build and deploy your code to npm

Tear down the pipeline

1. Run the script `devops/scripts/delete-pipeline.sh`
   1. with your deployed stack name `--stackName <your stackname>`
   1. with your aws profile `--profile <your profile>`
