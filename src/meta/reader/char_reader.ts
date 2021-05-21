import { VirtualFile } from './../../data/index';
import { MetaFile } from './../index';
import { Reader } from './reader';



export type CharReader = Reader<string>;

export function CharReader(this: CharReader, mf: MetaFile, vf: VirtualFile) {
    this.mf = mf;
    this.vf = vf;
}

CharReader.prototype.read = async function (this: CharReader, record: number): Promise<string> {
    const blockSize = this.mf.getBlockSize();
    const ofsread = await this.vf.offsetFile.read(Buffer.allocUnsafe(4), 0, 4, record * 4);
    const data = await this.vf.dataFile.read(Buffer.allocUnsafe(blockSize), 0, blockSize, ofsread.buffer.readUInt32BE());
    return data.buffer.toString(this.mf.getEncoding());
}

