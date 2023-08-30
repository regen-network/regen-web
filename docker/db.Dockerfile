FROM postgis/postgis:14-3.3

# Set data directory
ENV PGDATA=/var/pgdata

# Create directory to store PostgreSQL data and logs
RUN mkdir -p ${PGDATA} /tmp /var/log/postgresql

# Change owner of directory to postgres group and user
RUN chown -R postgres:postgres ${PGDATA} /tmp /var/log/postgresql

# Change working directory
WORKDIR /home/db

# Copy init script
COPY docker/scripts/db_init.sh /home/db/scripts/

# Copy start script
COPY docker/scripts/db_start.sh /home/db/scripts/

# Make start script executable
RUN ["chmod", "+x", "/home/db/scripts/db_start.sh"]

# Set user to run init script and db container
USER postgres

# Run init script
RUN /home/db/scripts/db_init.sh
