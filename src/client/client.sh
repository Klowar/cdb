#!/bin/bash

# Super simple client for socket based server
host=$1
port=$2

if [ -z "$1" ]; then
    host="localhost"
fi

if [ -z "$2" ]; then
    port="9999"
fi

nc "$host" "$port"
