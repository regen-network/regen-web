FROM node:16

# Set version
ENV GIT_CHECKOUT='b20be3fad1aafef58c473c5380c5ff8fe9dc1d81'

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

# Copy server start script
COPY docker/scripts/server_start.sh /home/server/scripts/

# Make start script executable
RUN ["chmod", "+x", "/home/server/scripts/server_start.sh"]
