# NOTE: We use node 18 to prevent pg_restore version issues. This is part of
# a workaround until we update the node version within regen-server. See sed
# command on line 23 below for the second part of the workaround.
FROM node:18

# Install dependencies
RUN apt-get update
RUN apt-get install libpq-dev postgresql-client -y

# Set version
ENV GIT_CHECKOUT='a18df8663d6e25495a3bfeaf86e985855fff15a6'

# Clone repository
RUN git clone https://github.com/regen-network/registry-server/ /home/server

# Set working directory
WORKDIR /home/server

# Use provided version
RUN git checkout $GIT_CHECKOUT

# Workaround to resolve postgresql version issues
RUN sed -i 's/"node": "16.x"/"node": "18.x"/' /home/server/package.json

# Set working directory
WORKDIR /home/server/server

# Install dependencies
RUN yarn

# Set environment variables required for build
RUN echo "AIRTABLE_API_KEY=test" >> .env # cannot be empty
RUN echo "AUTH0_DOMAIN=test" >> .env # cannot be empty
RUN echo "AUTH0_CLIENT_ID=test" >> .env # cannot be empty
RUN echo "AUTH0_CLIENT_SECRET=test" >> .env # cannot be empty
RUN echo "MAILERLITE_API_KEY=test" >> .env # cannot be empty
RUN echo "DATABASE_URL=postgres://postgres:password@localhost:5432/server" >> .env
RUN echo "INDEXER_DATABASE_URL=postgres://postgres:password@localhost:5432/indexer" >> .env
RUN echo "LEDGER_TENDERMINT_RPC=http://localhost:26657" >> .env
RUN echo "LEDGER_REST_ENDPOINT=http://localhost:1317" >> .env
RUN echo "GRAPHIQL_ENABLED=true" >> .env

# Build server
RUN yarn build

# Set working directory
WORKDIR /home/server

# Copy database dump
COPY dump-server-production /home/server/

# Copy server init script
COPY docker/scripts/server_init.sh /home/server/scripts/

# Copy server start script
COPY docker/scripts/server_start.sh /home/server/scripts/

# Make init script executable
RUN ["chmod", "+x", "/home/server/scripts/server_init.sh"]

# Make start script executable
RUN ["chmod", "+x", "/home/server/scripts/server_start.sh"]
