#!/bin/bash

echo "Generating Rows for cassandra"

for i in {0..1000000}
do
    echo $i
    kind=$((i % 10))
    md5string=`echo -n ${kind} | md5 | awk '{ print $1 }'`
    INSERT_QUERY="INSERT INTO test(cost,name) VALUES(${i},'${md5string}');"
    echo $INSERT_QUERY >> inserts.sql
done
