import { Socket } from 'net';

export type ConnectionType = {
    logger: Console | null;
    socket: Socket | null;
    credentials: null;
    init: (this: ConnectionType, socket: Socket) => void;
    onData: (data: Buffer) => void;
    onError: (error: Error) => void;
}

export function Connection(this: ConnectionType) {
    this.logger = null;
    this.socket = null;
    this.credentials = null;
}

Connection.prototype.init = function (this: ConnectionType, socket: Socket) {
    this.socket = socket;
    this.socket.setEncoding("utf-8");
    this.socket.addListener("data", this.onData);
    this.socket.addListener("error", this.onError);
}

Connection.prototype.write = function (this: ConnectionType, data: string | Uint8Array) {
    this.socket?.write(data);
}

Connection.prototype.getSocket = function () {
    return this.socket;
}

Connection.prototype.setLogger = function (this: ConnectionType, logger: Console) {
    this.logger = logger;
}

Connection.prototype.onData = function onData(this: ConnectionType, data: Buffer) {
    this.logger?.log("data", data);
}

Connection.prototype.onError = function onError(this: ConnectionType, err: Error) {
    this.logger?.error("error", err);
}

Connection.prototype.addListener = function (this: ConnectionType, event: string, listener: (...args: any[]) => void) {
    this.socket?.addListener(event, listener);
}
