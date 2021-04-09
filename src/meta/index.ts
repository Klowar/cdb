import { createTemporaryFile, TemporaryFile } from '../temp';
import { ENCODING_UTF_8 } from './constants';



export type MetaFile = {
    tf: TemporaryFile;
    blockSize: number;
    blockAmount: number;
    encoding: string;
    setBlockSize: (size: number) => void;
    setBlockAmount: (amount: number) => void;
    setEncoding: (enc: string) => void;
    write: (offset: number, data: any) => void;
    read: (offset: number, amount: number) => void;
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

MetaFile.prototype.write = function (this: MetaFile, offset: number, data: any) {
    console.log(this, "Tries to write to data file");
}

MetaFile.prototype.read = function (this: MetaFile, offset: number, amount: number) {
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
