FROM postgis/postgis:14-3.3

# Set data directory
ENV PGDATA=/var/pgdata

# Create directory to store PostgreSQL data and logs
RUN mkdir -p ${PGDATA} /tmp /var/log/postgresql

# Change owner of directory to postgres group and user
RUN chown -R postgres:postgres ${PGDATA} /tmp /var/log/postgresql

# Change working directory
WORKDIR /home/db

# Copy database dumps
COPY dump-server-production /home/db/

# Copy start script
COPY docker/scripts/db_start.sh /home/db/scripts/

# Make start script executable
RUN ["chmod", "+x", "/home/db/scripts/db_start.sh"]

# Set the user to run the container
USER postgres
