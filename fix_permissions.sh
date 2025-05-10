#!/bin/bash

# Change permissions of all files and directories in the current directory to appropriate level
chmod 700 *
chmod -R 755 dev/

# Create 'dev/db' folder if it doesn't exist and set its permission to 777
mkdir -p dev/db
chmod 777 dev/db

cp ./db/*.db dev/db

# Set permissions of the databases to 666
chmod 666 dev/db/*.db

echo "Permissions and files set successfully."