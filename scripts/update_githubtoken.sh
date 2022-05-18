#!/bin/bash

echo "Unsetting the current GitHub token"
GITHUB_TOKEN_OLD=$GITHUB_TOKEN
unset GITHUB_TOKEN

echo "Getting a new token with read:packages scope"
gh auth login -h github.com -s read:packages

echo "Copy the token below 👇🏼"
gh config get -h github.com oauth_token

echo "Restoring the original GitHub token"
export GITHUB_TOKEN=$GITHUB_TOKEN_OLD
echo $GITHUB_TOKEN

echo "How to set environment secrets: https://docs.aws.amazon.com/amplify/latest/userguide/environment-variables.html#setting-env-vars"
