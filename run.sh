#!/usr/bin/bash

# make sure the setup is good to go
./setup.sh

# start the python server
python3 pybackend/manage.py runserver &

# start the apache server
docker compose up &

