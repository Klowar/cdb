import { EventEmitter } from 'events';
import { Server, Socket } from 'net';
import { logger } from '../core/logger';
import { connection } from './connection';

serverPrototype.prototype = new EventEmitter();
function serverPrototype() {
    this.addConnection = function(connection) {
        this.connections.push(connection);
    }
    this.getPhysicalServer = function() {
        return this.server;
    }
    this.onConnection = function(socket: Socket) {
        const conn = new connection();
        conn.setLogger(this.logger);
        conn.init(socket);
        return conn;
    }
}

server.prototype = new serverPrototype();
export function server() {
    this.connections = [];
    this.server = new Server();
    this.logger = new logger();
    this.server.addListener("connection", (socket: Socket) => {
        const conn = this.onConnection(socket);
        this.addConnection(conn);
        this.emit("connect", conn);
    });
}