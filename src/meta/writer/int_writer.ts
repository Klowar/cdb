import { Writer } from '.';
import { VirtualFile } from './../../data/index';
import { MetaFile } from './../index';



export type IntWriter = Writer<number>;

export function IntWriter(this: IntWriter, mf: MetaFile, vf: VirtualFile) {
    this.mf = mf;
    this.vf = vf;
    this.recordSize = 4;
}

IntWriter.prototype.write = async function (this: IntWriter, offset: number, data: number): Promise<number> {
    const offsetBuffer = Buffer.allocUnsafe(4);
    offsetBuffer.writeUInt32BE(offset);
    const dataBuffer = Buffer.allocUnsafe(4);
    dataBuffer.writeInt32BE(data);
    return Promise.all(
        [
            this.vf.offsetFile.write(offsetBuffer), // Append to offset file
            this.vf.dataFile.write(dataBuffer, 0, 4, offset) // Write to interested position
        ]
    ).then(() => 4);
}

IntWriter.prototype.writeData = async function (this: IntWriter, data: number, offset: number): Promise<number> {
    const dataBuffer = Buffer.allocUnsafe(4);
    dataBuffer.writeInt32BE(data);
    return this.vf.dataFile.write(dataBuffer, 0, 4, offset).then(() => 4); // Write to interested position
}

IntWriter.prototype.writeRecord = async function (this: IntWriter, offset: number, data: number, record: number) {
    const offsetBuffer = Buffer.allocUnsafe(4);
    offsetBuffer.writeUInt32BE(offset);
    return this.vf.offsetFile.write(offsetBuffer, 0, 4, record * 4) // Override offset on position
        .then(() => 4);
}
