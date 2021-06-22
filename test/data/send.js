'use strict'


const { argv } = require('process');
const fs = require('fs');
const net = require('net');
const readline = require('readline');

const file = argv[2];
const lines = [];

async function processLineByLine() {

    const rl = readline.createInterface({
        input: fs.createReadStream(file, { encoding: 'utf-8' }),
        crlfDelay: Infinity,
    });

    const connection = net.connect({ host: '127.0.0.1', port: 9999 });
    connection.on('data', (data) => {
        console.log(data.toString());
        connection.write(lines.pop());
    });

    for await (const line of rl) {
        lines.push(line);
    }
    connection.write(lines.pop());
}

processLineByLine();

//  CREATE TABLE test(cost INTEGER, name CHARACTER(35));
