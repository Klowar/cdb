import { VirtualFile } from '../../data/index';
import { MetaFile } from '../index';



export type Updater<T> = {
    mf: MetaFile;
    vf: VirtualFile;
    update: (records: number[], data: T) => Promise<number[]>; // Number of bytes written
}

export function Updater<T>(this: Updater<T>, mf: MetaFile, vf: VirtualFile) {
    this.mf = mf;
    this.vf = vf;
}

Updater.prototype.update = async function (this: Updater<any>, records: number[], data: any) {
    throw new Error("Unrealized Updater:update");
}

