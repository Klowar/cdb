import { Reader } from '.';
import { containNumber } from '../util';
import { VirtualFile } from './../../data/index';
import { MetaFile } from './../index';



export type IntReader = Reader<number>;

export function IntReader(this: IntReader, mf: MetaFile, vf: VirtualFile) {
    this.mf = mf;
    this.vf = vf;
    this.recordSize = 4;
}

IntReader.prototype.read = async function (this: IntReader, record: number): Promise<number> {
    const ofsread = await this.vf.offsetFile.read(Buffer.allocUnsafe(4), 0, 4, record * 4);
    const data = await this.vf.dataFile.read(Buffer.allocUnsafe(4), 0, 4, ofsread.buffer.readUInt32BE());
    return data.buffer.readInt32BE();
}

IntReader.prototype.readRecord = async function (this: IntReader, record: number): Promise<[number, number]> {
    return this.vf.offsetFile.read(Buffer.allocUnsafe(4), 0, 4, record * 4)
        .then((buf) => [buf.buffer.readUInt32BE(), 4]);
}

IntReader.prototype.findOffset = async function (this: IntReader, data: number): Promise<number> {
    const buffer = Buffer.allocUnsafe(128 * 4);
    let offset = 0;
    let additionalOffset = -1;
    let read = await this.vf.dataFile.read(buffer, 0, buffer.byteLength, offset);

    while (read.bytesRead > 0 && additionalOffset == -1) {
        offset += read.bytesRead;
        additionalOffset = containNumber(read.buffer, read.bytesRead, data, 4);
        read = await this.vf.dataFile.read(buffer, 0, buffer.byteLength, offset);
    }

    return additionalOffset;
}

IntReader.prototype.readIndices = async function (this: IntReader, offset: number, value: number) {
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
