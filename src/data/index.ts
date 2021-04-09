import { Stats } from 'fs';
import { open, stat } from 'fs/promises';
import { nanoid } from 'nanoid';
import { join } from 'path';
import { DATA_ROOT } from './../globals';
import { DEFAULT_BUFFER_BYTE_SIZE } from './constants';

const CREATE_MODE = 'a+';
const MODE = 'r+';
const RIGHTS = 0o666;

export type VirtualFile = {
    fd: number,
    path: string,
    metaData: Stats,
    buffer: ArrayBuffer
    setFd: (fd: number) => void;
    setStat: (stat: Stats) => void;
    write: (offset: number, data: any) => void;
    read: (offset: number, amount: number) => any;
}

function VirtualFile(this: VirtualFile, path: string) {
    this.fd = 0;
    this.path = path;
    this.buffer = new ArrayBuffer(DEFAULT_BUFFER_BYTE_SIZE);
}

VirtualFile.prototype.setFd = function (this: VirtualFile, fd: number) {
    this.fd = fd;
}

VirtualFile.prototype.setStat = function (this: VirtualFile, stat: Stats) {
    this.metaData = stat;
}

VirtualFile.prototype.write = function (this: VirtualFile, offset: number, data: any) {
    console.log(this, "Tries to write to data file");
}

VirtualFile.prototype.read = function (this: VirtualFile, offset: number, amount: number) {
    console.log(this, "Tries to read the data file");
}


export function getVirtualFile(path: string, mode = MODE): VirtualFile {
    const vf = new VirtualFile(path);
    open(path, mode, RIGHTS).then((fh) => vf.setFd(fh.fd));
    stat(path).then((st) => vf.setStat(st));
    return vf;
}

export function createVirtualFile(): VirtualFile {
    const path = join(DATA_ROOT, nanoid());
    const vf = new VirtualFile(path);
    open(path, CREATE_MODE, RIGHTS).then((fh) => vf.setFd(fh.fd));
    stat(path).then((st) => vf.setStat(st));
    return vf;
}
