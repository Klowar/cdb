import { Writer } from '.';
import { VirtualFile } from './../../data/index';
import { MetaFile } from './../index';



export type VarCharWriter = Writer<string>;

export function VarCharWriter(this: VarCharWriter, mf: MetaFile, vf: VirtualFile) {
    this.mf = mf;
    this.vf = vf;
    this.recordSize = 8;
}

VarCharWriter.prototype.write = async function (this: VarCharWriter, offset: number, data: string): Promise<number> {
    const offsetBuffer = Buffer.allocUnsafe(8);
    const dataBuffer = Buffer.from(data)
    offsetBuffer.writeUInt32BE(offset);
    offsetBuffer.writeUInt32BE(data.length, 4)

    return Promise.all(
        [
            this.vf.offsetFile.write(offsetBuffer), // Append to offset file
            this.vf.dataFile.write(dataBuffer, 0, dataBuffer.length, offset) // Write to interested position
        ]
    ).then(() => data.length);
}

VarCharWriter.prototype.writeRecord = async function (this: VarCharWriter, offset: number, data: string, record: number): Promise<number> {
    const offsetBuffer = Buffer.allocUnsafe(8);
    offsetBuffer.writeUInt32BE(offset);
    offsetBuffer.writeUInt32BE(data.length, 4)

    return this.vf.offsetFile.write(offsetBuffer, 0, 8, record * 8) // Override offset on position
        .then(() => data.length);
}

