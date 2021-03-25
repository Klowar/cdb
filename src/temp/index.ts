import { nanoid } from 'nanoid';
import { getVirtualFile, VirtualFile } from '../data';
import { DEFAULT_LOCK_SIZE } from './constants';

export type TemporaryFile = {
    vf: VirtualFile,
    target: VirtualFile,
    lockOn: {
        size?: number,
        time?: Date
    },
    deadArr: number[] // indicies, not bitmap
}

function TemporaryFile(vf: VirtualFile) {
    this.vf = vf;
    this.fd = 0;
    this.lockOn = {
        size: DEFAULT_LOCK_SIZE
    };
    this.deadArr = [];
}

TemporaryFile.prototype.setTarget = function (target: VirtualFile) {
    this.target = target;
}

TemporaryFile.prototype.write = function (offset, data) {
    console.log(this, "Tries to write");
}

TemporaryFile.prototype.read = function (offset, amount) {
    console.log(this, "Tries to read");
}


export function getTemporaryFile(vf: VirtualFile) {
    const tf = new TemporaryFile(vf);
    tf.setTarget(getVirtualFile(nanoid()));

    return tf;
}
