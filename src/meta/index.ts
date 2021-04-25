import { Request } from './../processor/index';
import { createTemporaryFile, TemporaryFile } from '../temp';
import { DeleteStatement, InsertStatement, SelectStatement, UpdateStatement, Literal } from './../parser/types';
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
    getIndices: (value: Literal) => Promise<number[]>;
    write: (statement: Request<InsertStatement>) => Promise<any>;
    update: (statement: Request<UpdateStatement>) => Promise<any>;
    read: (statement: Request<SelectStatement>) => Promise<any>;
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

MetaFile.prototype.getIndices = async function (this: MetaFile, value: Literal) {
    return this.tf.getIndices(0, this.blockAmount * this.blockSize, this.blockSize, value.value);
}

MetaFile.prototype.write = async function (this: MetaFile, req: Request<InsertStatement>) {
    console.log(this, "Tries to write to meta file");
    return new Promise((res, rej) => {
        this.tf.write(this.blockAmount * this.blockSize, req.statement.values[this.index])
            .then(() => res(++this.blockAmount))
            .catch(rej);
    });
}

MetaFile.prototype.update = function (this: MetaFile, statement: Request<UpdateStatement>) {
    console.log(this, "Tries to write to meta file");
}

MetaFile.prototype.read = function (this: MetaFile, statement: Request<SelectStatement>) {
    console.log(this, "Tries to read the meta file");
}

MetaFile.prototype.delete = function (this: MetaFile, statement: Request<DeleteStatement>) {
    console.log(this, "Tries to delete the meta file");
}

export function getMetaFile(tf: TemporaryFile): MetaFile {
    const vf = new MetaFile(tf);

    return vf;
}

export function createMetaFile(): MetaFile {
    const vf = new MetaFile(createTemporaryFile());

    return vf;
}
