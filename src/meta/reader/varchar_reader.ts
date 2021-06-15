import { Reader } from '.';
import { VirtualFile } from './../../data/index';
import { Comparator } from '../../union/filter/compare/index';
import { MetaFile } from './../index';



export type VarCharReader = Reader<string>;

export function VarCharReader(this: VarCharReader, mf: MetaFile, vf: VirtualFile) {
    this.mf = mf;
    this.vf = vf;
    this.recordSize = 8;
}

VarCharReader.prototype.read = async function (this: VarCharReader, record: number): Promise<string> {
    const ofsread = await this.vf.offsetFile.read(Buffer.allocUnsafe(this.recordSize), 0, this.recordSize, record * this.recordSize);
    const dataOfsread = ofsread.buffer.readUInt32BE(0);
    const dataLength = ofsread.buffer.readUInt32BE(this.recordSize / 2);
    const data = await this.vf.dataFile.read(Buffer.allocUnsafe(dataLength), 0, dataLength, dataOfsread);

    return data.buffer.toString(this.mf.getEncoding());
}

VarCharReader.prototype.readRecord = async function (this: VarCharReader, record: number): Promise<[number, number]> {
    return this.vf.offsetFile.read(Buffer.allocUnsafe(this.recordSize), 0, this.recordSize, record * this.recordSize)
        .then((buf) => [buf.buffer.readUInt32LE(), buf.buffer.readUInt32BE(this.recordSize / 2)]);
}

VarCharReader.prototype.findOffset = async function (this: VarCharReader, data: string): Promise<number> {
    const buffer = Buffer.allocUnsafe(128 * this.recordSize);
    let offset = 0;
    let read = await this.vf.offsetFile.read(buffer, 0, buffer.byteLength, offset);

    while (read.bytesRead > 0) {
        for (let i = 0; i < read.bytesRead; i += this.recordSize)
            if (buffer.readUInt32BE(i + 4) == data.length) {
                const candidat = await this.vf.dataFile.read(
                    Buffer.allocUnsafe(buffer.readUInt32BE(i + 4)), 0, buffer.readUInt32BE(i + 4), buffer.readUInt32BE(i));
                const candidatString = candidat.buffer.toString(this.mf.encoding);
                if (candidatString == data)
                    return buffer.readUInt32BE(i);
            }
        // iteration
        offset += read.bytesRead;
        read = await this.vf.offsetFile.read(buffer, 0, buffer.byteLength, offset);
    }

    return -1;
}

VarCharReader.prototype.readValues = async function (this: VarCharReader, comparator: Comparator<string>): Promise<string[]> {
    const buffer = Buffer.allocUnsafe(128 * this.recordSize);
    let resultSet: string[] = [];
    let offset = 0;
    let read = await this.vf.offsetFile.read(buffer, 0, buffer.byteLength, offset);

    while (read.bytesRead > 0) {
        for (let i = 0; i < read.bytesRead; i += this.recordSize)
            if (buffer.readUInt32BE(i + 4) == comparator.value.length) {
                const candidat = await this.vf.dataFile.read(
                    Buffer.allocUnsafe(buffer.readUInt32BE(i + 4)), 0, buffer.readUInt32BE(i + 4), buffer.readUInt32BE(i));
                if (comparator.compare(candidat.buffer.toString(this.mf.encoding)))
                    resultSet.push(candidat.buffer.toString(this.mf.encoding));
            }
        // iteration
        offset += read.bytesRead;
        read = await this.vf.offsetFile.read(buffer, 0, buffer.byteLength, offset);
    }

    return resultSet;
}

VarCharReader.prototype.readIndices = async function (this: VarCharReader, offset: number, value: string) {
    const indices: number[] = [];
    const dataOffset = await this.findOffset(value);
    if (dataOffset == -1) return indices;

    const buffer = Buffer.allocUnsafe(this.recordSize * 128);
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
