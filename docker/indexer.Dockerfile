FROM python:3.9

# Install dependencies
RUN apt-get update
RUN apt-get install libpq-dev postgresql-client -y

# Set version and chain
ENV GIT_CHECKOUT='8d3635aa33d4d49db903f947bb357c938d168f8d'

# Clone regen ledger
RUN git clone https://github.com/regen-network/indexer/ /home/indexer

# Set working directory
WORKDIR /home/indexer

# Use provided version
RUN git checkout $GIT_CHECKOUT

# Install python dependencies
RUN pip install poetry
RUN pip install load_dotenv
RUN pip install psycopg2
RUN pip install sentry_sdk
RUN pip install tenacity

# Install indexer
RUN poetry install

# Copy indexer init script
COPY docker/scripts/indexer_init.sh /home/indexer/scripts/

# Copy indexer start script
COPY docker/scripts/indexer_start.sh /home/indexer/scripts/

# Make init script executable
RUN ["chmod", "+x", "/home/indexer/scripts/indexer_init.sh"]

# Make start script executable
RUN ["chmod", "+x", "/home/indexer/scripts/indexer_start.sh"]
