#!/usr/bin/bash

killall docker-compose
killall python3

sleep 5

echo "Processes stopped..."
echo "sanity check below:"

ps
