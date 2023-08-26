#!/bin/bash

SERVER_INITIALIZED="SERVER_INITIALIZED"

# initialize server if not yet initialized
if [ ! -e $SERVER_INITIALIZED ]; then

  # set server initialized
  touch $SERVER_INITIALIZED

  echo "First start, running init script..."

  # run server init script
  /home/server/scripts/server_init.sh
fi

# start server
yarn serve
