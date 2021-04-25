import { createTemporaryFile, TemporaryFile } from '../temp';
import { DeleteStatement, Literal, SelectStatement, UpdateStatement } from './../parser/types';
import { Request } from './../processor/index';
import { ENCODING_UTF_8 } from './constants';



export type MetaFile = {
    tf: TemporaryFile;
    blockSize: number;
    blockAmount: number;
    encoding: string;
    setBlockSize: (size: number) => void;
    setBlockAmount: (amount: number) => void;
    setEncoding: (enc: string) => void;
    getIndices: (value: Literal) => Promise<number[]>;
    write: (statement: Literal) => Promise<any>;
    update: (statement: Request<UpdateStatement>) => Promise<any>;
    read: (statement: Request<SelectStatement>) => Promise<any>;
}

function MetaFile(this: MetaFile, tf: TemporaryFile) {
    this.tf = tf;
    this.blockSize = 0;
    this.blockAmount = 0;
    this.encoding = ENCODING_UTF_8;
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

MetaFile.prototype.write = async function (this: MetaFile, lit: Literal) {
    console.log(this, "Tries to write to meta file");
    return new Promise((res, rej) => {
        this.tf.write(this.blockAmount * this.blockSize, this.blockSize, lit)
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
