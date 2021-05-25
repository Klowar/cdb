import { constants, Stats } from 'fs';
import { FileHandle, open, stat } from 'fs/promises';
import { nanoid } from 'nanoid';
import { join } from 'path';
import { DATA_ROOT } from './../globals';
import { Reader } from './../meta/reader/reader';
import { Writer } from './../meta/writer/writer';



const CREATE_MODE = constants.O_RDWR | constants.O_CREAT;
const MODE = constants.O_NONBLOCK | constants.O_RDWR;
const RIGHTS = 0o666;

export type VirtualFile = {
    writer: Writer<any>;
    reader: Reader<any>;
    dataFile: FileHandle;
    offsetFile: FileHandle;
    path: string;
    offsetPath: string;
    metaData: Stats;
    setDataFile: (dataFile: FileHandle) => void;
    setOffsetFile: (offsetFile: FileHandle) => void;
    setStat: (stat: Stats) => void;
    readIndices: (offset: number, value: string | number) => Promise<any>;
    findOffset: (value: string | number, blockSize: number) => Promise<number>;
    write: (offset: number, data: string | number) => Promise<any>;
    writeOffset: (offset: number) => Promise<any>;
    read: (record: number) => Promise<{ bytesRead: number; buffer: Buffer; }>;
    delete: (offset: number, amount: number) => Promise<any>;
}

function VirtualFile(this: VirtualFile, path: string, offsetPath: string) {
    this.path = path;
    this.offsetPath = offsetPath;
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

VirtualFile.prototype.readIndices = async function (this: VirtualFile, offset: number, value: string | number) {
    return this.reader.readIndices(offset, value);
}

VirtualFile.prototype.findOffset = async function (this: VirtualFile, value: string | number, blockSize: number) {
    return await this.reader.findOffset(value);
}

VirtualFile.prototype.write = async function (this: VirtualFile, offset: number, data: number | string) {
    console.log(this, "Write data layer");
    return this.writer.write(offset, data);
}

VirtualFile.prototype.writeOffset = async function (this: VirtualFile, offset: number) {
    const offsetBuffer = Buffer.allocUnsafe(4);
    offsetBuffer.writeUInt32BE(offset);
    return this.offsetFile.write(offsetBuffer);
}

VirtualFile.prototype.read = async function (this: VirtualFile, record: number) {
    console.log(this, "Read data layer");
    return this.reader.read(record);
}

VirtualFile.prototype.delete = async function (this: VirtualFile, record: number, amount: number) {
    console.log(this, "Tries to delete the data file");
}


export function getVirtualFile(path: string, offsetPath: string, mode = MODE): VirtualFile {
    const vf = new VirtualFile(path, offsetPath);
    open(path, mode, RIGHTS)
        .then((fh) => vf.setDataFile(fh))
        .then(() => stat(path).then((st) => vf.setStat(st)));
    open(offsetPath, mode, RIGHTS).then((fh) => vf.setOffsetFile(fh));
    return vf;
}

export function createVirtualFile(): VirtualFile {
    const dataPath = join(DATA_ROOT, nanoid());
    const offsetPath = join(DATA_ROOT, nanoid());
    const vf = new VirtualFile(dataPath, offsetPath);
    open(dataPath, CREATE_MODE, RIGHTS)
        .then((fh) => vf.setDataFile(fh))
        .then(() => stat(dataPath).then((st) => vf.setStat(st)));
    open(offsetPath, CREATE_MODE, RIGHTS).then((fh) => vf.setOffsetFile(fh));
    return vf;
}
