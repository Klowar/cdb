import { Stats } from 'fs';
import { open, stat } from 'fs/promises';
import { DEFAULT_BUFFER_BYTE_SIZE } from './constants';

const MODE = 'r+';
const RIGHTS = 0o666;

export type VirtualFile = {
    fd: number,
    path: string,
    metaData: Stats,
    buffer: ArrayBuffer
}

function virtualFile(path: string) {
    this.fd = 0;
    this.path = path;
    this.buffer = new ArrayBuffer(DEFAULT_BUFFER_BYTE_SIZE);
    this.readFilter = new ArrayBuffer(1024 * 1024);
    this.writeFilter = new ArrayBuffer(1024 * 1024);
}

virtualFile.prototype.setFd = function (fd: number) {
    this.fd = fd;
}

virtualFile.prototype.setStat = function (stat: Stats) {
    this.metaData = stat;
}

virtualFile.prototype.write = function (offset, data) {
    console.log(this, "Tries to write to data file");
}

virtualFile.prototype.read = function (offset, amount) {
    console.log(this, "Tries to read the data file");
}


export function getVirtualFile(path: string, mode = MODE) {
    const vf = new virtualFile(path);
    open(path, mode, RIGHTS).then((fh) => vf.setFd(fh.fd));
    stat(path).then((st) => vf.setStat(st));
    return vf;
}
