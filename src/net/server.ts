import { EventEmitter } from 'events';
import { Server as PServer, Socket } from 'net';
import { Connection } from './connection';

export type Server = {
    connections: Connection[];
    server: PServer;
} & ServerProtoType;

export type ServerProtoType = {
    getPhysicalServer: () => PServer;
    onConnection: (socket: Socket) => Connection;
} & EventEmitter;

serverPrototype.prototype = new EventEmitter();
function serverPrototype(this: ServerProtoType) {
    this.getPhysicalServer = function (this: Server) {
        return this.server;
    }
    this.onConnection = function (socket: Socket) {
        const conn: Connection = new Connection();
        conn.init(socket);
        return conn;
    }
}

Server.prototype = new serverPrototype();
export function Server(this: Server) {
    this.connections = [];
    this.server = new PServer();
    this.server.addListener("connection", (socket: Socket) => {
        const conn = this.onConnection(socket);
        this.emit("connect", conn);
    });
}