#!/usr/bin/bash

# create the database if it doesn't exist
if [ ! -d ./db/ ]; then
    mkdir db
fi

if [ ! -f ./db/weekend-list.db ]; then
    echo "creating the database"

    if [ ! -d .py-env ]; then
        echo "creating python virtual environment"
        python3 -m venv .py-env
    fi

    source .py-env/bin/activate
    pip3 install -r requirements.txt

    python3 setup.py
else
    echo "database exists already"
fi

bash fix_permissions.sh