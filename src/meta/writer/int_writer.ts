import { VirtualFile } from './../../data/index';
import { MetaFile } from './../index';
import { Writer } from './writer';



export type IntWriter = Writer<number>;

export function IntWriter(this: IntWriter, mf: MetaFile, vf: VirtualFile) {
    this.mf = mf;
    this.vf = vf;
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
    ).then(() => data);
}

