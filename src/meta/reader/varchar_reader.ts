import { Reader } from '.';
import { containLength } from '../util';
import { VirtualFile } from './../../data/index';
import { MetaFile } from './../index';



export type VarCharReader = Omit<Reader<string>, 'findOffset'> & {
    findOffset: (data: string) => Promise<number[]>;
};

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

VarCharReader.prototype.findOffset = async function (this: VarCharReader, data: string): Promise<number[]> {
    const buffer = Buffer.allocUnsafe(128 * 8);
    let offset = 0;
    let additionalOffset: number[] = [];
    let read = await this.vf.offsetFile.read(buffer, 0, buffer.byteLength, offset);

    while (read.bytesRead > 0 && additionalOffset.length == 0) {
        offset += read.bytesRead;
        additionalOffset = containLength(read.buffer, read.bytesRead, data.length, 4);
        if (additionalOffset.length != 0
            && (await this.vf.dataFile.read(Buffer.allocUnsafe(data.length), 0, data.length, additionalOffset[0])).buffer.toString() == data)
            return additionalOffset;
        else additionalOffset.length = 0;
        read = await this.vf.offsetFile.read(buffer, 0, buffer.byteLength, offset);
    }

    return additionalOffset;
}

VarCharReader.prototype.readIndices = async function (this: VarCharReader, offset: number, value: string) {
    const indices: number[] = [];
    const dataOffset: number[] = await this.findOffset(value);
    if (dataOffset.length == 0) return indices;

    const buffer = Buffer.allocUnsafe(8 * 128);
    let read = await this.vf.offsetFile.read(buffer, 0, buffer.length, offset);
    while (read.bytesRead > 0) {
        for (let i = 0; i < read.bytesRead; i += 8)
            if (buffer.readInt32BE(i) === dataOffset[0])
                indices.push(i / 8);
        offset += read.bytesRead;
        read = await this.vf.offsetFile.read(buffer, 0, buffer.length, offset);
    }

    return indices;
}
