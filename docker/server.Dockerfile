FROM node:16

# Install dependencies
RUN apt-get update
RUN apt-get install libpq-dev postgresql-client -y

# Set version
ENV GIT_CHECKOUT='d258432e35ae773e06cff61a6718e0b757a23b90'

# Clone repository
RUN git clone https://github.com/regen-network/registry-server/ /home/server

# Set working directory
WORKDIR /home/server/server

# Use provided version
RUN git checkout $GIT_CHECKOUT

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

# Copy server init script
COPY docker/scripts/server_init.sh /home/server/scripts/

# Copy server start script
COPY docker/scripts/server_start.sh /home/server/scripts/

# Make init script executable
RUN ["chmod", "+x", "/home/server/scripts/server_init.sh"]

# Make start script executable
RUN ["chmod", "+x", "/home/server/scripts/server_start.sh"]
