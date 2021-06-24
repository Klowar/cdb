import { Comparator } from '../union/filter/compare/index';
import { createVirtualFile, VirtualFile } from './../data/index';
import { logger } from './../globals';
import { ENCODING_UTF_8 } from './constants';
import { getReader, getUpdater, getWriter } from './util';



export type MetaFile = {
    vf: VirtualFile;
    mode: string;
    dataType: string;
    blockSize: number;
    blockAmount: number;
    offset: number;
    encoding: BufferEncoding;
    getDataType: () => string;
    setDataType: (dataType: string) => void;
    setMode: (mode: string) => void;
    getBlockSize: () => number;
    setBlockSize: (size: number) => void;
    getBlockAmount: () => number;
    setBlockAmount: (amount: number) => void;
    setEncoding: (enc: string) => void;
    getEncoding: () => BufferEncoding;
    getValues: (comparator: Comparator<any>) => Promise<any[]>;
    getIndices: (value: string | number) => Promise<number[]>;
    getOffset: (value: string | number) => Promise<number>;
    write: (statement: string | number) => Promise<number>;
    writeData: (statement: string | number, offset?: number) => Promise<number>;
    writeRecord: (offset: number, data: string | number, record?: number) => Promise<any>;
    update: (records: number[], data: string | number) => Promise<any>;
    readRange: (start: number, end?: number) => Promise<any>;
    read: (records: number[] | undefined) => Promise<any>;
    delete: (records: number[]) => Promise<any>;
}

function MetaFile(this: MetaFile, vf: VirtualFile) {
    this.vf = vf;
    this.blockSize = 0;
    this.blockAmount = 0;
    this.offset = 0;
    this.encoding = ENCODING_UTF_8;
}

MetaFile.prototype.getDataType = function (this: MetaFile) {
    return this.dataType;
}

MetaFile.prototype.setDataType = function (this: MetaFile, dataType: string) {
    this.dataType = dataType;
    this.vf.writer = getWriter(dataType, this);
    this.vf.reader = getReader(dataType, this);
}

MetaFile.prototype.setMode = function (this: MetaFile, mode: string) {
    this.mode = mode;
    this.vf.updater = getUpdater(mode, this);
}

MetaFile.prototype.getBlockSize = function (this: MetaFile) {
    return this.blockSize;
}

MetaFile.prototype.setBlockSize = function (this: MetaFile, size: number) {
    this.blockSize = size;
}

MetaFile.prototype.getBlockAmount = function (this: MetaFile) {
    return this.blockAmount;
}

MetaFile.prototype.setBlockAmount = function (this: MetaFile, amount: number) {
    this.blockAmount = amount;
}

MetaFile.prototype.setEncoding = function (this: MetaFile, enc: BufferEncoding) {
    this.encoding = enc;
}

MetaFile.prototype.getEncoding = function (this: MetaFile) {
    return this.encoding;
}

MetaFile.prototype.getValues = function (this: MetaFile, comparator: Comparator<any>) {
    return this.vf.getValues(comparator);
}

MetaFile.prototype.getIndices = async function (this: MetaFile, value: number | string) {
    return this.vf.getIndices(0, value);
}

MetaFile.prototype.getOffset = async function (this: MetaFile, value: number | string) {
    return this.vf.findOffset(value);
}

MetaFile.prototype.write = async function (this: MetaFile, lit: string | number) {
    logger.debug("Write to meta file");
    return this.vf.write(this.offset, lit)
        .then((size) => this.offset += size)
        .then(() => ++this.blockAmount);
}

MetaFile.prototype.writeData = async function (this: MetaFile, lit: string | number, offset?: number) {
    logger.debug("Write to meta file");
    const previousOffset = this.offset;
    return this.vf.writeData(lit, offset || this.offset)
        .then((size) => this.offset += size)
        .then(() => previousOffset);
}

MetaFile.prototype.writeRecord = async function (this: MetaFile, offset: number, data: string | number, record?: number) {
    return this.vf.writeRecord(offset, data, record || this.blockAmount).then(() => ++this.blockAmount);
}

MetaFile.prototype.update = async function (this: MetaFile, records: number[], data: string | number) {
    logger.debug("Write to meta file");
    return this.vf.update(records, data);
}

MetaFile.prototype.read = async function (this: MetaFile, req: number[] | undefined) {
    logger.debug("Read the meta file");
    if (req === undefined) return new Promise(() => []);
    // TODO: Change read strategy
    return Promise.all(
        req.map((record) => this.vf.read(record))
    );
}

MetaFile.prototype.readRange = async function (this: MetaFile, start: number, end?: number) {
    logger.debug("ReadRange the meta file");
    // TODO: Change read strategy
    end = end || this.blockAmount;
    const promises: Promise<any>[] = new Array(end - start);
    for (let i = start; i < end; i++)
        promises[i - start] = this.vf.read(i);

    return Promise.all(promises)
}

MetaFile.prototype.delete = function (this: MetaFile, records: number[]) {
    logger.debug("Delete the meta file");
}

export function getMetaFile(vf: VirtualFile): MetaFile {
    const mf = new MetaFile(vf);

    return mf;
}

export function createMetaFile(): MetaFile {
    const mf = new MetaFile(createVirtualFile());
    return mf;
}
