import { VirtualFile } from './../../data/index';
import { MetaFile } from './../index';



export type Writer<T> = {
    mf: MetaFile;
    vf: VirtualFile;
    write: (offset: number, data: T) => Promise<T>;
}

export function Writer<T>(this: Writer<T>, mf: MetaFile, vf: VirtualFile) {
    this.mf = mf;
    this.vf = vf;
}

Writer.prototype.write = async function (this: Writer<any>, offset: number, data: any) {
    throw new Error("Unrealized writer:write");
}

