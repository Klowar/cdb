import { Server, Socket } from 'net';
import { logger } from '../core/logger';
import { getParser } from '../handler';
import { connection } from './connection';

function server() {
    this.connections = [];
    this.server = new Server();
    this.server.addListener("connection", (socket: Socket) => {
        const conn = this.onConnection(socket);
        conn.addListener("data", (data: Buffer) => {
            const str = data.toString();
            var parser = getParser();
            parser.parse(str);
            socket.write(
                JSON.stringify(parser.parser.yy.ast)
            );
        })
        this.addConnection(conn);
    });
}

server.prototype.getPhysicalServer = function() {
    return this.server;
}

server.prototype.addConnection = function(connection) {
    this.connections.push(connection);
}

server.prototype.onConnection = function(socket: Socket) {
    const conn = new connection();
    conn.setLogger(new logger());
    conn.init(socket);
    return conn;
}

export function getServer() {
    return new server();
}
