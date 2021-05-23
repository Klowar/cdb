import { VirtualFile } from './../../data/index';
import { MetaFile } from './../index';



export type Reader<T> = {
    mf: MetaFile;
    vf: VirtualFile;
    read: (record: number) => Promise<T>;
    findOffset: (data: T) => Promise<number>;
}

export function Reader<T>(this: Reader<T>, mf: MetaFile, vf: VirtualFile) {
    this.mf = mf;
    this.vf = vf;
}

Reader.prototype.read = async function (this: Reader<any>, record: number) {
    throw new Error("Unrealized reader:read");
}

Reader.prototype.findOffset = async function (this: Reader<any>, record: number) {
    throw new Error("Unrealized reader:findOffset");
}

