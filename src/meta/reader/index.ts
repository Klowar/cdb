import { VirtualFile } from '../../data/index';
import { MetaFile } from '../index';



export type Reader<T> = {
    mf: MetaFile;
    vf: VirtualFile;
    recordSize: number;
    read: (record: number) => Promise<T>;
    readRecord: (record: number) => Promise<[number, number]>; // [offset, length]
    findOffset: (data: T) => Promise<number>;
    readIndices: (offset: number, value: any) => Promise<number[]>;
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

Reader.prototype.readIndices = async function (this: Reader<any>, offset: number, value: any) {
    throw new Error("Unrealized reader:readIndices");
}

