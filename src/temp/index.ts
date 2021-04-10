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
    write: (offset: number, data: any) => void;
    read: (offset: number, amount: number) => any;
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

TemporaryFile.prototype.write = function (this: TemporaryFile, offset: number, data: any) {
    console.log(this, "Tries to write");
}

TemporaryFile.prototype.read = function (this: TemporaryFile, offset: number, amount: number) {
    console.log(this, "Tries to read");
}


export function getTemporaryFile(vf: VirtualFile): TemporaryFile {
    const tf = new TemporaryFile(vf);
    tf.setTarget(getVirtualFile(nanoid()));

    return tf;
}

export function createTemporaryFile(): TemporaryFile {
    const tf = new TemporaryFile(createVirtualFile());
    tf.setTarget(createVirtualFile());
    return tf;
}
