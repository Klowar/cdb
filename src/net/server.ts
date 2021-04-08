import { EventEmitter } from 'events';
import { Server, Socket } from 'net';
import { Connection, ConnectionType } from './connection';

export type ServerType = {
    connections: ConnectionType[];
    server: Server;
} & ServerProtoType;

export type ServerProtoType = {
    getPhysicalServer: () => Server;
    onConnection: (socket: Socket) => ConnectionType;
} & EventEmitter;

serverPrototype.prototype = new EventEmitter();
function serverPrototype(this: ServerProtoType) {
    this.getPhysicalServer = function (this: ServerType) {
        return this.server;
    }
    this.onConnection = function (socket: Socket) {
        const conn: ConnectionType = new Connection();
        conn.init(socket);
        return conn;
    }
}

server.prototype = new serverPrototype();
export function server(this: ServerType) {
    this.connections = [];
    this.server = new Server();
    this.server.addListener("connection", (socket: Socket) => {
        const conn = this.onConnection(socket);
        this.emit("connect", conn);
    });
}