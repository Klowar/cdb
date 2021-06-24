import { Reader } from '.';
import { VirtualFile } from './../../data/index';
import { Comparator } from '../../union/filter/compare/index';
import { MetaFile } from './../index';



export type CharReader = Reader<string>;

export function CharReader(this: CharReader, mf: MetaFile, vf: VirtualFile) {
    this.mf = mf;
    this.vf = vf;
    this.recordSize = 4;
}

CharReader.prototype.read = async function (this: CharReader, record: number): Promise<string | null> {
    const blockSize = this.mf.getBlockSize();
    const ofsread = await this.vf.offsetFile.read(Buffer.allocUnsafe(this.recordSize), 0, this.recordSize, record * this.recordSize);
    if (ofsread.bytesRead == 0) return null;
    const data = await this.vf.dataFile.read(Buffer.allocUnsafe(blockSize), 0, blockSize, ofsread.buffer.readUInt32BE());
    return data.buffer.toString(this.mf.getEncoding());
}

CharReader.prototype.readRecord = async function (this: CharReader, record: number): Promise<[number, number]> {
    return this.vf.offsetFile.read(Buffer.allocUnsafe(this.recordSize), 0, this.recordSize, record * this.recordSize)
        .then((buf) => [buf.buffer.readUInt32BE(), this.mf.blockSize]);
}

CharReader.prototype.findOffset = async function (this: CharReader, data: string): Promise<number> {
    const buffer = Buffer.allocUnsafe(128 * this.mf.blockSize);
    let offset = 0;
    let read = await this.vf.dataFile.read(buffer, 0, buffer.byteLength, offset);

    while (read.bytesRead > 0) {
        for (let i = this.mf.blockSize; i < read.bytesRead; i += this.mf.blockSize)
            if (data == buffer.slice(i - this.mf.blockSize, i).toString(this.mf.encoding))
                return offset + i - this.mf.blockSize;
        offset += read.bytesRead;
        read = await this.vf.dataFile.read(buffer, 0, buffer.byteLength, offset);
    }

    return -1;
}

CharReader.prototype.readValues = async function (this: CharReader, comparator: Comparator<string>): Promise<string[]> {
    const buffer = Buffer.allocUnsafe(128 * this.mf.blockSize);
    let offset = 0;
    let resultSet: string[] = [];
    let read = await this.vf.dataFile.read(buffer, 0, buffer.byteLength, offset);

    while (read.bytesRead > 0) {
        for (let i = this.mf.blockSize; i < read.bytesRead; i += this.mf.blockSize)
            if (comparator.compare(buffer.slice(i - this.mf.blockSize, i).toString(this.mf.encoding)))
                resultSet.push(buffer.slice(i - this.mf.blockSize, i).toString(this.mf.encoding));
        offset += read.bytesRead;
        read = await this.vf.dataFile.read(buffer, 0, buffer.byteLength, offset);
    }

    return resultSet;
}

CharReader.prototype.readIndices = async function (this: CharReader, offset: number, value: string): Promise<number[]> {
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
