import { Socket } from 'net';

export function connection() {
    this.logger = null;
    this.socket = null;
    this.credentials = null;
}

connection.prototype.init = function(socket: Socket) {
    this.socket = socket;
    this.socket.setEncoding("utf-8");
    this.socket.addListener("data", (data: Buffer) => this.onData(data));
    this.socket.addListener("error", (err: Error) => this.onError(err));
}

connection.prototype.setLogger = function(logger) {
    this.logger = logger;
}

connection.prototype.onData = function onData(data: Buffer) {
    if (this.logger != null) this.logger.log("data", data);
}

connection.prototype.onError = function onError(err: Error) {
    if (this.logger != null) this.logger.log("error", err);
}

connection.prototype.addListener = function(event: string, listener: EventListener) {
    this.socket.addListener(event, listener);
}
