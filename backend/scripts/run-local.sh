#!/bin/bash

FILE=./src/main/resources/config/service-account.json

echo "** Creating service key from gopass **"
mkdir -p ./src/main/resources/config
`gopass show ewall/gcp/iam/e-wall-board/firebase-adminsdk-hkptn > ${FILE}`
echo "** Running the bootRun for the app. **"
gradle bootRun