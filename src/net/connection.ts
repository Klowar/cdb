import { Socket } from 'net';

export function Connection() {
    this.logger = null;
    this.socket = null;
    this.credentials = null;
}

Connection.prototype.init = function(socket: Socket) {
    this.socket = socket;
    this.socket.setEncoding("utf-8");
    this.socket.addListener("data", this.onData);
    this.socket.addListener("error", this.onError);
}

Connection.prototype.write = function(data: string | Uint8Array) {
    this.socket.write(data);
}

Connection.prototype.getSocket = function() {
    return this.socket;
}

Connection.prototype.setLogger = function(logger) {
    this.logger = logger;
}

Connection.prototype.onData = function onData(data: Buffer) {
    if (this.logger != null) this.logger.log("data", data);
}

Connection.prototype.onError = function onError(err: Error) {
    if (this.logger != null) this.logger.error("error", err);
}

Connection.prototype.addListener = function(event: string, listener: EventListener) {
    this.socket.addListener(event, listener);
}
