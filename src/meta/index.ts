import { createTemporaryFile, TemporaryFile } from '../temp';
import { InsertStatement, SelectStatement, UpdateStatement } from './../parser/types';
import { ENCODING_UTF_8 } from './constants';



export type MetaFile = {
    tf: TemporaryFile;
    index: number;
    blockSize: number;
    blockAmount: number;
    encoding: string;
    getIndex: () => number;
    setIndex: (index: number) => void;
    setBlockSize: (size: number) => void;
    setBlockAmount: (amount: number) => void;
    setEncoding: (enc: string) => void;
    write: (statement: InsertStatement) => any;
    update: (statement: UpdateStatement) => any;
    read: (statement: SelectStatement) => any;
}

function MetaFile(this: MetaFile, tf: TemporaryFile) {
    this.tf = tf;
    this.blockSize = 0;
    this.blockAmount = 0;
    this.encoding = ENCODING_UTF_8;
}

MetaFile.prototype.getIndex = function (this: MetaFile) {
    return this.index;
}

MetaFile.prototype.setIndex = function (this: MetaFile, index: number) {
    this.index = index;
}

MetaFile.prototype.setBlockSize = function (this: MetaFile, size: number) {
    this.blockSize = size;
}

MetaFile.prototype.setBlockAmount = function (this: MetaFile, amount: number) {
    this.blockAmount = amount;
}

MetaFile.prototype.setEncoding = function (this: MetaFile, enc: string) {
    this.encoding = enc;
}

MetaFile.prototype.write = function (this: MetaFile, statement: InsertStatement) {
    console.log(this, "Tries to write to data file");
    this.tf.write(this.blockAmount++ * this.blockSize, statement.values[this.index]);
}

MetaFile.prototype.update = function (this: MetaFile, statement: UpdateStatement) {
    console.log(this, "Tries to write to data file");
}

MetaFile.prototype.read = function (this: MetaFile, statement: SelectStatement) {
    console.log(this, "Tries to read the data file");
}

export function getMetaFile(tf: TemporaryFile): MetaFile {
    const vf = new MetaFile(tf);

    return vf;
}

export function createMetaFile(): MetaFile {
    const vf = new MetaFile(createTemporaryFile());

    return vf;
}
