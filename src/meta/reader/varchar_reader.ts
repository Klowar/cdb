import { VirtualFile } from './../../data/index';
import { MetaFile } from './../index';
import { Reader } from './reader';



export type VarCharReader = Reader<string>;

export function VarCharReader(this: VarCharReader, mf: MetaFile, vf: VirtualFile) {
    this.mf = mf;
    this.vf = vf;
}

VarCharReader.prototype.read = async function (this: VarCharReader, record: number): Promise<string> {
    const ofsread = await this.vf.offsetFile.read(Buffer.allocUnsafe(8), 0, 8, record * 8);
    const dataOfsread = ofsread.buffer.readUInt32BE(0);
    const dataLength = ofsread.buffer.readUInt32BE(4);
    const data = await this.vf.dataFile.read(Buffer.allocUnsafe(dataLength), 0, dataLength, dataOfsread);
    
    return data.buffer.toString(this.mf.getEncoding());
}

