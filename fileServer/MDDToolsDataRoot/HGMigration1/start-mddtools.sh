#! /bin/bash

docker compose up -d

if [ -n "$1" ]; then
    docker compose logs -f
fi
