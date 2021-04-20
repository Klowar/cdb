import { Stats } from 'fs';
import { FileHandle, open, stat } from 'fs/promises';
import { nanoid } from 'nanoid';
import { join } from 'path';
import { DATA_ROOT } from './../globals';
import { Literal } from './../parser/types';
import { DEFAULT_BUFFER_BYTE_SIZE } from './constants';

const CREATE_MODE = 'wx+';
const MODE = 'r+';
const RIGHTS = 0o666;

export type VirtualFile = {
    dataFile: FileHandle;
    offsetFile: FileHandle;
    path: string;
    offsetPath: string;
    metaData: Stats;
    buffer: ArrayBuffer;
    setDataFile: (dataFile: FileHandle) => void;
    setOffsetFile: (offsetFile: FileHandle) => void;
    setStat: (stat: Stats) => void;
    write: (offset: number, data: any) => Promise<any>;
    read: (offset: number, amount: number) => Promise<any>;
    delete: (offset: number, amount: number) => Promise<any>;
}

function VirtualFile(this: VirtualFile, path: string, offsetPath: string) {
    this.path = path;
    this.offsetPath = offsetPath;
    this.buffer = new ArrayBuffer(DEFAULT_BUFFER_BYTE_SIZE);
}

VirtualFile.prototype.setDataFile = function (this: VirtualFile, dataFile: FileHandle) {
    this.dataFile = dataFile;
}

VirtualFile.prototype.setOffsetFile = function (this: VirtualFile, offsetFile: FileHandle) {
    this.offsetFile = offsetFile;
}

VirtualFile.prototype.setStat = function (this: VirtualFile, stat: Stats) {
    this.metaData = stat;
}

VirtualFile.prototype.write = async function (this: VirtualFile, offset: number, data: Literal) {
    console.log(this, "Tries to write to data file");
    const arr = typeof data.value === 'string' ? Buffer.from(data.value) : Uint8Array.from([data.value]);
    return Promise.all(
        [
            this.dataFile.write(arr, offset),
            this.offsetFile.write(Uint8Array.from([offset]))
        ]
    );
}

VirtualFile.prototype.read = async function (this: VirtualFile, offset: number, amount: number) {
    console.log(this, "Tries to read the data file");
}

VirtualFile.prototype.delete = async function (this: VirtualFile, offset: number, amount: number) {
    console.log(this, "Tries to delete the data file");
}


export function getVirtualFile(path: string, offsetPath: string, mode = MODE): VirtualFile {
    const vf = new VirtualFile(path, offsetPath);
    open(path, mode, RIGHTS).then((fh) => vf.setDataFile(fh));
    open(offsetPath, mode, RIGHTS).then((fh) => vf.setOffsetFile(fh));
    stat(path).then((st) => vf.setStat(st));
    return vf;
}

export function createVirtualFile(): VirtualFile {
    const dataPath = join(DATA_ROOT, nanoid());
    const offsetPath = join(DATA_ROOT, nanoid());
    const vf = new VirtualFile(dataPath, offsetPath);
    open(dataPath, CREATE_MODE, RIGHTS).then((fh) => vf.setDataFile(fh));
    open(offsetPath, CREATE_MODE, RIGHTS).then((fh) => vf.setOffsetFile(fh));
    stat(dataPath).then((st) => vf.setStat(st));
    return vf;
}
