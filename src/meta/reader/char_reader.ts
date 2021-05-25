import { containString } from '../util';
import { DEFAULT_READ_STEP } from './../../data/constants';
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


CharReader.prototype.findOffset = async function (this: CharReader, data: string): Promise<number> {
    const buffer = Buffer.allocUnsafe(128 * this.mf.getBlockSize());
    let offset = 0;
    let additionalOffset = -1;
    let read = await this.vf.dataFile.read(buffer, 0, buffer.byteLength, offset);

    while (read.bytesRead > 0 && additionalOffset == -1) {
        offset += read.bytesRead;
        additionalOffset = containString(read.buffer, read.bytesRead, data, this.mf.getBlockSize());
        read = await this.vf.dataFile.read(buffer, 0, buffer.byteLength, offset);
    }

    return additionalOffset;
}

CharReader.prototype.readIndices = async function (this: CharReader, offset: number, value: string) {
    const indices: number[] = [];
    const dataOffset = await this.findOffset(value);
    if (dataOffset < 0) return indices;

    const buffer = Buffer.allocUnsafe(4 * 256);
    let read = await this.vf.offsetFile.read(buffer, 0, buffer.length, offset);
    while (read.bytesRead > 0) {
        for (let i = 0; i < read.bytesRead; i += 4)
            if (buffer.readInt32BE(i) === dataOffset)
                indices.push(i / 4);
        offset += read.bytesRead;
        read = await this.vf.offsetFile.read(buffer, 0, buffer.length, offset);
    }

    return indices;
}
