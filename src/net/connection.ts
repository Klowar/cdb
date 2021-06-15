import { Socket } from 'net';

export type Connection = {
    logger: Console | null;
    socket: Socket | null;
    credentials: null;
    getSocket: () => Socket;
    init: (socket: Socket) => void;
    onData: (data: Buffer) => void;
    onError: (error: Error) => void;
    write: (data: string | Uint8Array) => void;
    addListener: (event: string, listener: (...args: any[]) => void) => void;
}

export function Connection(this: Connection) {
    this.logger = null;
    this.socket = null;
    this.credentials = null;
}

Connection.prototype.init = function (this: Connection, socket: Socket) {
    this.socket = socket;
    this.socket.setEncoding("utf-8");
    this.socket.addListener("data", this.onData);
    this.socket.addListener("error", this.onError);
}

Connection.prototype.write = function (this: Connection, data: string | Uint8Array) {
    this.socket?.write(data);
}

Connection.prototype.getSocket = function (this: Connection) {
    return this.socket;
}

Connection.prototype.setLogger = function (this: Connection, logger: Console) {
    this.logger = logger;
}

Connection.prototype.onData = function onData(this: Connection, data: Buffer) {
    this.logger?.log("data", data);
}

Connection.prototype.onError = function onError(this: Connection, err: Error) {
    this.logger?.error("error", err);
}

Connection.prototype.addListener = function (this: Connection, event: string, listener: (...args: any[]) => void) {
    this.socket?.addListener(event, listener);
}
