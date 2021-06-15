import { Reader } from '.';
import { VirtualFile } from './../../data/index';
import { Comparator } from '../../union/filter/compare/index';
import { MetaFile } from './../index';



export type IntReader = Reader<number>;

export function IntReader(this: IntReader, mf: MetaFile, vf: VirtualFile) {
    this.mf = mf;
    this.vf = vf;
    this.recordSize = 4;
}

IntReader.prototype.read = async function (this: IntReader, record: number): Promise<number> {
    const ofsread = await this.vf.offsetFile.read(Buffer.allocUnsafe(this.recordSize), 0, this.recordSize, record * this.recordSize);
    const data = await this.vf.dataFile.read(Buffer.allocUnsafe(this.mf.blockSize), 0, this.mf.blockSize, ofsread.buffer.readUInt32BE());
    return data.buffer.readInt32BE();
}

IntReader.prototype.readRecord = async function (this: IntReader, record: number): Promise<[number, number]> {
    return this.vf.offsetFile.read(Buffer.allocUnsafe(this.recordSize), 0, this.recordSize, record * this.recordSize)
        .then((buf) => [buf.buffer.readUInt32BE(), this.mf.blockSize]);
}

IntReader.prototype.findOffset = async function (this: IntReader, data: number): Promise<number> {
    const buffer = Buffer.allocUnsafe(128 * this.mf.blockSize);
    let offset = 0;
    let read = await this.vf.dataFile.read(buffer, 0, buffer.byteLength, offset);

    while (read.bytesRead > 0) {
        for (let i = 0; i < read.bytesRead; i += this.mf.blockSize)
            if (buffer.readInt32BE(i) == data)
                return offset + i;
        offset += read.bytesRead;
        read = await this.vf.dataFile.read(buffer, 0, buffer.byteLength, offset);
    }

    return -1;
}

IntReader.prototype.readValues = async function (this: IntReader, comparator: Comparator<number>) {
    const buffer = Buffer.allocUnsafe(128 * this.mf.blockSize);
    let offset = 0;
    let resultSet: number[] = [];
    let read = await this.vf.dataFile.read(buffer, 0, buffer.byteLength, offset);

    while (read.bytesRead > 0) {
        for (let i = 0; i < read.bytesRead; i += this.mf.blockSize)
            if (comparator.compare(buffer.readInt32BE(i)))
                resultSet.push(buffer.readInt32BE(i));
        offset += read.bytesRead;
        read = await this.vf.dataFile.read(buffer, 0, buffer.byteLength, offset);
    }

    return resultSet;
}

IntReader.prototype.readIndices = async function (this: IntReader, offset: number, value: number) {
    const indices: number[] = [];
    const dataOffset = await this.findOffset(value);
    if (dataOffset < 0) return indices;

    const buffer = Buffer.allocUnsafe(this.recordSize * 256);
    let read = await this.vf.offsetFile.read(buffer, 0, buffer.length, offset);
    while (read.bytesRead > 0) {
        for (let i = 0; i < read.bytesRead; i += this.recordSize)
            if (buffer.readInt32BE(i) === dataOffset)
                indices.push(i / this.recordSize);
        offset += read.bytesRead;
        read = await this.vf.offsetFile.read(buffer, 0, buffer.length, offset);
    }

    return indices;
}
