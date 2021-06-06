import { createVirtualFile, VirtualFile } from './../data/index';
import { ENCODING_UTF_8 } from './constants';
import { getReader, getWriter } from './util';



export type MetaFile = {
    vf: VirtualFile;
    dataType: string;
    blockSize: number;
    blockAmount: number;
    offset: number;
    encoding: BufferEncoding;
    getDataType: () => string;
    setDataType: (dataType: string) => void;
    getBlockSize: () => number;
    setBlockSize: (size: number) => void;
    getBlockAmount: () => number;
    setBlockAmount: (amount: number) => void;
    setEncoding: (enc: string) => void;
    getEncoding: () => BufferEncoding;
    getIndices: (value: string | number) => Promise<number[]>;
    getOffset: (value: string | number) => Promise<number>;
    write: (statement: string | number) => Promise<any>;
    writeOffset: (offset: number) => Promise<any>;
    update: (records: number[], data: string | number) => Promise<any>;
    readRange: (start: number, end: number) => Promise<any>;
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

MetaFile.prototype.getIndices = async function (this: MetaFile, value: number | string) {
    return this.vf.readIndices(0, value);
}

MetaFile.prototype.getOffset = async function (this: MetaFile, value: number | string) {
    return this.vf.findOffset(value, this.blockSize);
}

MetaFile.prototype.write = async function (this: MetaFile, lit: string | number) {
    console.log(this, "Tries to write to meta file");
    return this.vf.write(this.offset, lit)
        .then((size) => this.offset += size)
        .then(() => ++this.blockAmount);
}

MetaFile.prototype.writeOffset = async function (this: MetaFile, offset: number) {
    return this.vf.writeOffset(offset).then(() => ++this.blockAmount);
}

MetaFile.prototype.update = function (this: MetaFile, records: number[], data: string | number) {
    console.log(this, "Tries to write to meta file");
}

MetaFile.prototype.read = async function (this: MetaFile, req: number[] | undefined) {
    console.log(this, "Tries to read the meta file");
    if (req === undefined) return new Promise(() => []);
    // TODO: Change read strategy
    return Promise.all(
        req.map((record) => this.vf.read(record))
    );
}

MetaFile.prototype.readRange = async function (this: MetaFile, start: number, end: number) {
    console.log(this, "Tries to read the meta file");
    // TODO: Change read strategy
    const promises: Promise<any>[] = new Array(end - start);
    for (let i = start; i < end; i++)
        promises[i - start] = this.vf.read(i);

    return Promise.all(promises)
}

MetaFile.prototype.delete = function (this: MetaFile, records: number[]) {
    console.log(this, "Tries to delete the meta file");
}

export function getMetaFile(vf: VirtualFile): MetaFile {
    const mf = new MetaFile(vf);

    return mf;
}

export function createMetaFile(): MetaFile {
    const mf = new MetaFile(createVirtualFile());
    return mf;
}
