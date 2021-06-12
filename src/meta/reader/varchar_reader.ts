import { Reader } from '.';
import { containLength } from '../util';
import { VirtualFile } from './../../data/index';
import { MetaFile } from './../index';



export type VarCharReader = Reader<string>;

export function VarCharReader(this: VarCharReader, mf: MetaFile, vf: VirtualFile) {
    this.mf = mf;
    this.vf = vf;
    this.recordSize = 8;
}

VarCharReader.prototype.read = async function (this: VarCharReader, record: number): Promise<string> {
    const ofsread = await this.vf.offsetFile.read(Buffer.allocUnsafe(8), 0, 8, record * 8);
    const dataOfsread = ofsread.buffer.readUInt32BE(0);
    const dataLength = ofsread.buffer.readUInt32BE(4);
    const data = await this.vf.dataFile.read(Buffer.allocUnsafe(dataLength), 0, dataLength, dataOfsread);

    return data.buffer.toString(this.mf.getEncoding());
}

VarCharReader.prototype.readRecord = async function (this: VarCharReader, record: number): Promise<[number, number]> {
    return this.vf.offsetFile.read(Buffer.allocUnsafe(8), 0, 8, record * 8)
        .then((buf) => [buf.buffer.readUInt32LE(), buf.buffer.readUInt32BE(4)]);
}

VarCharReader.prototype.findOffset = async function (this: VarCharReader, data: string): Promise<number> {
    const buffer = Buffer.allocUnsafe(128 * 8);
    let offset = 0;
    let additionalOffset: number[] = [];
    let read = await this.vf.offsetFile.read(buffer, 0, buffer.byteLength, offset);

    while (read.bytesRead > 0 && additionalOffset.length == 0) {
        offset += read.bytesRead;
        additionalOffset = containLength(read.buffer, read.bytesRead, data.length);
        if (additionalOffset.length != 0) {
            const candidat = await this.vf.dataFile.read(Buffer.allocUnsafe(additionalOffset[1]), 0, additionalOffset[1], additionalOffset[0]);
            const candidatString = candidat.buffer.toString(this.mf.encoding);
            if (candidatString == data)
                return additionalOffset[0];
        }
        else additionalOffset.length = 0;
        // iteration
        read = await this.vf.offsetFile.read(buffer, 0, buffer.byteLength, offset);
    }

    return -1;
}

VarCharReader.prototype.readIndices = async function (this: VarCharReader, offset: number, value: string) {
    const indices: number[] = [];
    const dataOffset = await this.findOffset(value);
    if (dataOffset == -1) return indices;

    const buffer = Buffer.allocUnsafe(8 * 128);
    let read = await this.vf.offsetFile.read(buffer, 0, buffer.length, offset);
    while (read.bytesRead > 0) {
        for (let i = 0; i < read.bytesRead; i += 8)
            if (buffer.readInt32BE(i) === dataOffset)
                indices.push(i / 8);
        offset += read.bytesRead;
        read = await this.vf.offsetFile.read(buffer, 0, buffer.length, offset);
    }

    return indices;
}
