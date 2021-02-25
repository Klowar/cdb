import { open, Stats } from 'fs';
import { promisify } from 'util';
import { DEFAULT_BUFFER_BYTE_SIZE } from './constants';
import { getFileMeta } from "./virtual_file_meta";

const MODE = 'r+';
const RIGHTS = 0o666;
const openP = promisify(open);

export type VirtualFile = {
    fd: number,
    path: string,
    metaData: Stats,
    buffer: ArrayBuffer
}

function virtualFile(path: string) {
    this.fd = 0;
    this.path = path;
    this.metaData = getFileMeta(path);
    this.buffer = new ArrayBuffer(DEFAULT_BUFFER_BYTE_SIZE);
    this.readFilter = new ArrayBuffer(1024 * 1024);
    this.writeFilter = new ArrayBuffer(1024 * 1024);
}

virtualFile.prototype.setFd = function(fd: number) {
    this.fd = fd;
}

virtualFile.prototype.write = function(offset, data) {
    console.log(this, "Tries to write");
}

virtualFile.prototype.read = function(offset, amount) {
    console.log(this, "Tries to read");
}


export function getVirtualFile(path: string, mode=MODE) {
    const vf = new virtualFile(path);
    openP(path, mode, RIGHTS).then(vf.setFd);
    return vf;
}
