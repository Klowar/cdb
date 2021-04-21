import { nanoid } from 'nanoid';
import { createVirtualFile, getVirtualFile, VirtualFile } from '../data';
import { DEFAULT_LOCK_SIZE } from './constants';

export type TemporaryFile = {
    vf: VirtualFile;
    target: VirtualFile;
    lockOn: {
        size?: number,
        time?: Date
    };
    deadArr: number[]; // indicies, not bitmap,
    setTarget: (target: VirtualFile) => void;
    getIndices: (offset: number, amount: number, blockSize: number, value: string | number) => Promise<number[]>;
    write: (offset: number, data: any) => Promise<any>;
    read: (offset: number, amount: number) => Promise<any>;
    delete: (offset: number, amount: number) => Promise<any>;
}

function TemporaryFile(this: TemporaryFile, vf: VirtualFile) {
    this.vf = vf;
    this.lockOn = {
        size: DEFAULT_LOCK_SIZE
    };
    this.deadArr = [];
}

TemporaryFile.prototype.setTarget = function (this: TemporaryFile, target: VirtualFile) {
    this.target = target;
}

TemporaryFile.prototype.getIndices = async function (this: TemporaryFile, offset: number, amount: number, blockSize: number, value: string | number) {
    return this.target.readIndices(offset, amount, blockSize, value);
}

TemporaryFile.prototype.write = async function (this: TemporaryFile, offset: number, data: any) {
    console.log(this, "Tries to write temp file");
    return this.target.write(offset, data);
}

TemporaryFile.prototype.read = async function (this: TemporaryFile, offset: number, amount: number) {
    console.log(this, "Tries to read temp file");
}

TemporaryFile.prototype.delete = async function (this: TemporaryFile, offset: number, amount: number) {
    console.log(this, "Tries to delete temp file");
}


export function getTemporaryFile(vf: VirtualFile): TemporaryFile {
    const tf = new TemporaryFile(vf);
    tf.setTarget(getVirtualFile(nanoid(), nanoid()));

    return tf;
}

export function createTemporaryFile(): TemporaryFile {
    const tf = new TemporaryFile(createVirtualFile());
    tf.setTarget(createVirtualFile());
    return tf;
}
