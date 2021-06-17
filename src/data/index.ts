import { constants, Stats } from 'fs';
import { FileHandle, open, stat } from 'fs/promises';
import { nanoid } from 'nanoid';
import { join } from 'path';
import { Reader } from '../meta/reader';
import { Writer } from '../meta/writer';
import { DATA_ROOT } from './../globals';
import { Updater } from './../meta/updater/index';
import { Comparator } from '../union/filter/compare/index';



const CREATE_MODE = constants.O_RDWR | constants.O_CREAT;
const MODE = constants.O_NONBLOCK | constants.O_RDWR;
const RIGHTS = 0o666;

export type VirtualFile = {
    writer: Writer<any>;
    reader: Reader<any>;
    updater: Updater<any>;
    dataFile: FileHandle;
    offsetFile: FileHandle;
    path: string;
    offsetPath: string;
    metaData: Stats;
    getRecordSize: () => number;
    setDataFile: (dataFile: FileHandle) => void;
    setOffsetFile: (offsetFile: FileHandle) => void;
    setStat: (stat: Stats) => void;
    getValues: (comparator: Comparator<any>) => Promise<any[]>;
    getIndices: (offset: number, value: string | number) => Promise<any>;
    findOffset: (value: string | number) => Promise<number>;
    write: (offset: number, data: string | number) => Promise<any>;
    writeRecord: (offset: number, data: string | number, record: number) => Promise<any>;
    read: (record: number) => Promise<string | number>;
    readRecord: (record: number) => Promise<[number, number]>;
    update: (records: number[], data: string | number) => Promise<number[]>;
    delete: (offset: number, amount: number) => Promise<any>;
}

function VirtualFile(this: VirtualFile, path: string, offsetPath: string) {
    this.path = path;
    this.offsetPath = offsetPath;
}

VirtualFile.prototype.getRecordSize = function (this: VirtualFile) {
    return this.reader.recordSize;
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

VirtualFile.prototype.getValues = async function (this: VirtualFile, comparator: Comparator<any>) {
    return this.reader.readValues(comparator);
}

VirtualFile.prototype.getIndices = async function (this: VirtualFile, offset: number, value: string | number) {
    return this.reader.readIndices(offset, value);
}

VirtualFile.prototype.findOffset = async function (this: VirtualFile, value: string | number) {
    return this.reader.findOffset(value);
}

VirtualFile.prototype.write = async function (this: VirtualFile, offset: number, data: number | string) {
    console.debug("Write data layer");
    return this.writer.write(offset, data);
}

VirtualFile.prototype.writeRecord = async function (this: VirtualFile, offset: number, data: string | number, record: number) {
    return this.writer.writeRecord(offset, data, record);
}

VirtualFile.prototype.read = async function (this: VirtualFile, record: number) {
    console.debug("Read data layer");
    return this.reader.read(record);
}

VirtualFile.prototype.readRecord = async function (this: VirtualFile, record: number) {
    console.debug("Read data layer");
    return this.reader.readRecord(record);
}

VirtualFile.prototype.update = async function (this: VirtualFile, records: number[], data: string | number) {
    console.debug("Update data layer");
    return this.updater.update(records, data);
}

VirtualFile.prototype.delete = async function (this: VirtualFile, record: number, amount: number) {
    console.debug("Tries to delete the data file");
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
