import { EventEmitter } from 'events';
import { Server, Socket } from 'net';
import { Connection } from './connection';

serverPrototype.prototype = new EventEmitter();
function serverPrototype() {
    this.getPhysicalServer = function () {
        return this.server;
    }
    this.onConnection = function (socket: Socket) {
        const conn = new Connection();
        conn.init(socket);
        return conn;
    }
}

server.prototype = new serverPrototype();
export function server() {
    this.connections = [];
    this.server = new Server();
    this.server.addListener("connection", (socket: Socket) => {
        const conn = this.onConnection(socket);
        this.emit("connect", conn);
    });
}