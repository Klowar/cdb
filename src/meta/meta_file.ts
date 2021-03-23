import { TemporaryFile } from './../temp/temp_file';
import { ENCODING_UTF_8 } from './constants';



export type MetaFile = {
    tf: TemporaryFile,
    blockSize: number,
    blockAmount: number,
    encoding: string
}

function metaFile(tf: TemporaryFile) {
    this.tf = tf;
    this.blockSize = 0;
    this.blockAmount = 0;
    this.encoding = ENCODING_UTF_8;
}

metaFile.prototype.setBlockSize = function (size: number) {
    this.blockSize = size;
}

metaFile.prototype.setBlockAmount = function (amount: number) {
    this.blockAmount = amount;
}

metaFile.prototype.setEncoding = function (enc: string) {
    this.encoding = enc;
}

metaFile.prototype.write = function (offset, data) {
    console.log(this, "Tries to write to data file");
}

metaFile.prototype.read = function (offset, amount) {
    console.log(this, "Tries to read the data file");
}

export function getMetaFile(tf: TemporaryFile) {
    const vf = new metaFile(tf);

    return vf;
}
