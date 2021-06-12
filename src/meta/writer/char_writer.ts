import { Writer } from '.';
import { VirtualFile } from './../../data/index';
import { MetaFile } from './../index';



export type CharWriter = Writer<string>;

export function CharWriter(this: CharWriter, mf: MetaFile, vf: VirtualFile) {
    this.mf = mf;
    this.vf = vf;
    this.recordSize = 4;
}

CharWriter.prototype.write = async function (this: CharWriter, offset: number, data: string): Promise<number> {
    const offsetBuffer = Buffer.allocUnsafe(4);
    offsetBuffer.writeUInt32BE(offset);
    const dataBuffer = Buffer.alloc(this.mf.blockSize);
    dataBuffer.write(data);
    return Promise.all(
        [
            this.vf.offsetFile.write(offsetBuffer), // Append to offset file
            this.vf.dataFile.write(dataBuffer, 0, this.mf.blockSize, offset) // Write to interested position
        ]
    ).then(() => this.mf.blockSize);
}

CharWriter.prototype.writeRecord = async function (this: CharWriter, offset: number, data: string, record: number) {
    const offsetBuffer = Buffer.allocUnsafe(4);
    offsetBuffer.writeUInt32BE(offset);
    return this.vf.offsetFile.write(offsetBuffer, 0, 4, record * 4) // Append to offset file
        .then(() => this.mf.blockSize);
}
