#!/bin/bash

INDEXER_INITIALIZED="INDEXER_INITIALIZED"

# initialize indexer if not yet initialized
if [ ! -e $INDEXER_INITIALIZED ]; then

  # set indexer initialized
  touch $INDEXER_INITIALIZED

  echo "First start, running init script..."

  # run indexer init script
  /home/indexer/scripts/indexer_init.sh
fi

# start indexer
poetry run python main.py
