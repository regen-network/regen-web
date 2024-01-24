FROM python:3.9

# Install dependencies
RUN apt-get update
RUN apt-get install libpq-dev postgresql-client nodejs python3-poetry yarnpkg -y

# Set version and chain
ENV GIT_CHECKOUT='07ba5fa054e34d2a0587daa944c8e517ff82ce18'

# Clone regen ledger
RUN git clone https://github.com/regen-network/indexer/ /home/indexer

# Set working directory
WORKDIR /home/indexer

# Use provided version
RUN git checkout $GIT_CHECKOUT

# Install indexer
RUN poetry install
RUN yarnpkg install 

# Copy indexer init script
COPY docker/scripts/indexer_init.sh /home/indexer/scripts/

# Copy indexer start script
COPY docker/scripts/indexer_start.sh /home/indexer/scripts/

# Make init script executable
RUN ["chmod", "+x", "/home/indexer/scripts/indexer_init.sh"]

# Make start script executable
RUN ["chmod", "+x", "/home/indexer/scripts/indexer_start.sh"]
