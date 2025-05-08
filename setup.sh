#!/usr/bin/bash

# update the git repo
#git pull

# set up python environment
if [ ! -d .py-env ]; then
  echo "Creating virtual environment" 
  python3 -m venv .py-env
fi
source .py-env/bin/activate
pip3 install -r requirements.txt

# create migrations files
cd pybackend
python3 manage.py makemigrations backend
python3 manage.py makemigrations 
# execute the SQL queries
python3 manage.py migrate backend
python3 manage.py migrate


