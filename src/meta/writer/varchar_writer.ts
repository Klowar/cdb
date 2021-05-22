import { VirtualFile } from './../../data/index';
import { MetaFile } from './../index';
import { Writer } from './writer';



export type VarCharWriter = Writer<string>;

export function VarCharWriter(this: VarCharWriter, mf: MetaFile, vf: VirtualFile) {
    this.mf = mf;
    this.vf = vf;
}

VarCharWriter.prototype.write = async function (this: VarCharWriter, offset: number, data: string): Promise<string> {
    const offsetBuffer = Buffer.allocUnsafe(8);
    const dataBuffer = Buffer.from(data)
    offsetBuffer.writeUInt32BE(offset);
    offsetBuffer.writeUInt32BE(data.length, 4)

    return Promise.all(
        [
            this.vf.offsetFile.write(offsetBuffer), // Append to offset file
            this.vf.dataFile.write(dataBuffer, 0, dataBuffer.length, offset) // Write to interested position
        ]
    ).then(() => data);
}

