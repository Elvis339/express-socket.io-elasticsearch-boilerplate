#!/bin/bash

MODULES="$PWD/node_modules"

if [ ! -d "$MODULES" ]; then
    echo "Installing modules in ${MODULES} ⚙️⚙️⚙️"
    npm install
fi

echo "DONT FORGET TO EXPORT NODE_ENV AND PORT!"