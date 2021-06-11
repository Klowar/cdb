import { VirtualFile } from '../../data/index';
import { MetaFile } from '../index';



export type Writer<T> = {
    mf: MetaFile;
    vf: VirtualFile;
    recordSize: number;
    write: (offset: number, data: T) => Promise<number>; // Number of bytes written
    writeRecord: (offset: number, data: T, record: number) => Promise<number>;
}

export function Writer<T>(this: Writer<T>, mf: MetaFile, vf: VirtualFile) {
    this.mf = mf;
    this.vf = vf;
}

Writer.prototype.write = async function (this: Writer<any>, offset: number, data: any) {
    throw new Error("Unrealized writer:write");
}

Writer.prototype.writeRecord = async function (this: Writer<any>, offset: number, data: any, record: number) {
    throw new Error("Unrealized writer:write");
}

