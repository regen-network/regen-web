FROM golang:1.19

# Install dependencies
RUN apt-get update
RUN apt-get install jq -y

# Set version and chain
ENV GIT_CHECKOUT='v5.1.2'
ENV REGEN_CHAIN_ID='regen-local'

# Clone regen ledger
RUN git clone https://github.com/regen-network/regen-ledger/ /home/ledger

# Set working directory
WORKDIR /home/ledger

# Use provided version
RUN git checkout $GIT_CHECKOUT

# Build regen binary
RUN make install

# Setup moniker, chain, homedir
RUN regen --chain-id $REGEN_CHAIN_ID init validator

# Set configuration
RUN regen config chain-id $REGEN_CHAIN_ID
RUN regen config keyring-backend test

# Update stake to uregen
RUN sed -i "s/stake/uregen/g" /root/.regen/config/genesis.json

# Add validator and user accounts
RUN printf "trouble alarm laptop turn call stem lend brown play planet grocery survey smooth seed describe hood praise whale smile repeat dry sauce front future\n\n" | regen keys --keyring-backend test add validator -i
RUN printf "cool trust waste core unusual report duck amazing fault juice wish century across ghost cigar diary correct draw glimpse face crush rapid quit equip\n\n" | regen keys --keyring-backend test add user -i

# Add validator to genesis
RUN regen add-genesis-account validator 1000000000uregen --keyring-backend test

# Generate validator transaction
RUN regen gentx validator 1000000uregen

# Collect validator transactions
RUN regen collect-gentxs

# Add user acount to genesis
RUN regen add-genesis-account user 1000000000uregen --keyring-backend test

# Set minimum gas price
RUN sed -i "s/minimum-gas-prices = \"\"/minimum-gas-prices = \"0uregen\"/" /root/.regen/config/app.toml

# Set cors allow all origins
RUN sed -i "s/cors_allowed_origins = \[\]/cors_allowed_origins = [\"*\"]/" /root/.regen/config/config.toml

# Copy bank denom state file
COPY docker/data/bank_denom_metadata.json /home/ledger/data/

# Copy ecocredit state file
COPY docker/data/ecocredit.json /home/ledger/data/

# Add bank denom state to genesis
RUN jq '.app_state.bank.denom_metadata |= . + input' /root/.regen/config/genesis.json /home/ledger/data/bank_denom_metadata.json > genesis-tmp.json

# Add ecocredit state to genesis
RUN jq '.app_state.ecocredit |= . + input' /root/.regen/config/genesis.json /home/ledger/data/ecocredit.json > genesis-tmp.json

# Overwrite genesis file with updated genesis file
RUN mv -f genesis-tmp.json /root/.regen/config/genesis.json

# Copy regen start script
COPY docker/scripts/ledger_start.sh /home/ledger/scripts/

# Make start script executable
RUN ["chmod", "+x", "/home/ledger/scripts/ledger_start.sh"]
