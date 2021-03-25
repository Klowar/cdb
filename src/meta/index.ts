import { TemporaryFile } from '../temp';
import { ENCODING_UTF_8 } from './constants';



export type MetaFile = {
    tf: TemporaryFile,
    blockSize: number,
    blockAmount: number,
    encoding: string
}

function MetaFile(tf: TemporaryFile) {
    this.tf = tf;
    this.blockSize = 0;
    this.blockAmount = 0;
    this.encoding = ENCODING_UTF_8;
}

MetaFile.prototype.setBlockSize = function (size: number) {
    this.blockSize = size;
}

MetaFile.prototype.setBlockAmount = function (amount: number) {
    this.blockAmount = amount;
}

MetaFile.prototype.setEncoding = function (enc: string) {
    this.encoding = enc;
}

MetaFile.prototype.write = function (offset, data) {
    console.log(this, "Tries to write to data file");
}

MetaFile.prototype.read = function (offset, amount) {
    console.log(this, "Tries to read the data file");
}

export function getMetaFile(tf: TemporaryFile) {
    const vf = new MetaFile(tf);

    return vf;
}
