import { VirtualFile } from './../../data/index';
import { MetaFile } from './../index';
import { Writer } from './writer';



export type CharWriter = Writer<string>;

export function CharWriter(this: CharWriter, mf: MetaFile, vf: VirtualFile) {
    this.mf = mf;
    this.vf = vf;
}

CharWriter.prototype.write = async function (this: CharWriter, offset: number, data: string): Promise<string> {
    const offsetBuffer = Buffer.allocUnsafe(4);
    offsetBuffer.writeUInt32BE(offset);
    const dataBuffer = Buffer.alloc(this.mf.blockSize);
    dataBuffer.write(data);
    return Promise.all(
        [
            this.vf.offsetFile.write(offsetBuffer), // Append to offset file
            this.vf.dataFile.write(dataBuffer, 0, this.mf.blockSize, offset) // Write to interested position
        ]
    ).then(() => data);
}

