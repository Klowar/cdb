import { Server, Socket } from 'net';

function listener(socket: Socket) {
    socket.setEncoding("utf-8");
    socket.addListener("data", (data) => {
        console.log(data);
    })
}

export function getServer() {
    return new Server(listener);
}
