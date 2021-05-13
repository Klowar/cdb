import { VirtualFile } from '../data';
import { createMetaFile, MetaFile } from './../meta/index';
import { Literal, UpdateStatement } from './../parser/types';
import { Request } from './../processor/index';
import { DEFAULT_LOCK_SIZE } from './constants';



export type TemporaryFile = {
    vf: MetaFile;
    target: MetaFile;
    lockOn: {
        size?: number,
        time?: Date
    };
    deadArr: number[]; // indicies, not bitmap,
    getDataType: () => string;
    setDataType: (dataType: string) => void;
    setBlockSize: (size: number) => void;
    setTarget: (target: VirtualFile) => void;
    getIndices: (value: Literal) => Promise<number[]>;
    write: (statement: Literal) => Promise<any>;
    update: (statement: Request<UpdateStatement>) => Promise<any>;
    read: (statement: number[] | undefined) => Promise<any>;
}

function TemporaryFile(this: TemporaryFile, vf: MetaFile) {
    this.vf = vf;
    this.lockOn = {
        size: DEFAULT_LOCK_SIZE
    };
    this.deadArr = [];
}

TemporaryFile.prototype.getDataType = function (this: TemporaryFile) {
    return this.target.getDataType();
}

TemporaryFile.prototype.setDataType = function (this: TemporaryFile, dataType: string) {
    this.target.setDataType(dataType);
    this.vf.setDataType(dataType);
}

TemporaryFile.prototype.setBlockSize = function (this: TemporaryFile, size: number) {
    this.target.setBlockSize(size);
    this.vf.setBlockSize(size);
}

TemporaryFile.prototype.setTarget = function (this: TemporaryFile, target: MetaFile) {
    this.target = target;
}

TemporaryFile.prototype.getIndices = async function (this: TemporaryFile, value: Literal) {
    return this.target.getIndices(value.value);
}

TemporaryFile.prototype.write = async function (this: TemporaryFile, data: Literal) {
    console.log(this, "Tries to write temp file");
    return this.target.write(data.value);
}

TemporaryFile.prototype.read = async function (this: TemporaryFile, req: number[] | undefined) {
    console.log(this, "Tries to read temp file");
    return this.target.read(req);
}

TemporaryFile.prototype.delete = async function (this: TemporaryFile, offset: number, amount: number) {
    console.log(this, "Tries to delete temp file");
}


export function getTemporaryFile(mf: MetaFile): TemporaryFile {
    const tf = new TemporaryFile(mf);
    tf.setTarget(createMetaFile());

    return tf;
}

export function createTemporaryFile(): TemporaryFile {
    const tf = new TemporaryFile(createMetaFile());
    tf.setTarget(createMetaFile());
    return tf;
}
