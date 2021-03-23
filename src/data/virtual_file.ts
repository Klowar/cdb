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

function VirtualFile(path: string) {
    this.fd = 0;
    this.path = path;
    this.buffer = new ArrayBuffer(DEFAULT_BUFFER_BYTE_SIZE);
}

VirtualFile.prototype.setFd = function (fd: number) {
    this.fd = fd;
}

VirtualFile.prototype.setStat = function (stat: Stats) {
    this.metaData = stat;
}

VirtualFile.prototype.write = function (offset, data) {
    console.log(this, "Tries to write to data file");
}

VirtualFile.prototype.read = function (offset, amount) {
    console.log(this, "Tries to read the data file");
}


export function getVirtualFile(path: string, mode = MODE) {
    const vf = new VirtualFile(path);
    open(path, mode, RIGHTS).then((fh) => vf.setFd(fh.fd));
    stat(path).then((st) => vf.setStat(st));
    return vf;
}
