import { createMetaFile, MetaFile } from './../meta/index';
import { CREATE_OPTIONS, TABLE_MODE } from './../parser/constants';
import { Option } from './../parser/types';
import { DEFAULT_LOCK_SIZE } from './constants';
import { StreamJob } from './job';



export type TemporaryFile = {
    vf: MetaFile;
    target: MetaFile;
    streamJob: StreamJob;
    streamOffset: number;
    lockOn: {
        size?: number,
        time?: Date
    };
    deadArr: number[]; // indicies, not bitmap,
    getDataType: () => string;
    setDataType: (dataType: string) => void;
    setBlockSize: (size: number) => void;
    getBlockSize: () => number;
    setTarget: (target: MetaFile) => void;
    getIndices: (value: string | number) => Promise<number[]>;
    write: (data: string | number) => Promise<any>;
    update: (records: number[], data: string | number) => Promise<any>;
    read: (records: number[] | undefined) => Promise<any>;
    delete: (records: number[]) => Promise<any>;
}

function TemporaryFile(this: TemporaryFile, vf: MetaFile) {
    this.vf = vf;
    this.streamJob = new StreamJob(this).start();
    this.streamOffset = 0;
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

TemporaryFile.prototype.getBlockSize = function (this: TemporaryFile) {
    return this.target.getBlockSize();
}

TemporaryFile.prototype.setTarget = function (this: TemporaryFile, target: MetaFile) {
    this.target = target;
}

TemporaryFile.prototype.getIndices = async function (this: TemporaryFile, data: string | number) {
    return this.target.getIndices(data);
}

TemporaryFile.prototype.write = async function (this: TemporaryFile, data: string | number) {
    console.log(this, "Tries to write temp file");
    return this.vf.write(data);
}

TemporaryFile.prototype.read = async function (this: TemporaryFile, records: number[] | undefined) {
    console.log(this, "Tries to read temp file");
    if (records === undefined) return new Promise(() => []);
    return Promise.all([this.vf.read(records.filter(_ => _ > this.streamOffset)), this.target.read(records)]);
}

TemporaryFile.prototype.update = async function (this: TemporaryFile, records: number[], data: string | number) {
    console.log(this, "Tries to update temp file");
    return this.target.update(records, data);
}

TemporaryFile.prototype.delete = async function (this: TemporaryFile, records: number[]) {
    console.log(this, "Tries to delete temp file");
}


export function getTemporaryFile(mf: MetaFile): TemporaryFile {
    const tf: TemporaryFile = new TemporaryFile(mf);
    tf.setTarget(createMetaFile());

    return tf;
}

export function createTemporaryFile(options?: Option): TemporaryFile {
    const tf: TemporaryFile = new TemporaryFile(createMetaFile());
    tf.setTarget(createMetaFile());
    tf.vf.setMode(
        options != null
            ? options[CREATE_OPTIONS.MODE] as string
            : TABLE_MODE.UNIQUE
    );
    tf.target.setMode(
        options != null
            ? options[CREATE_OPTIONS.MODE] as string
            : TABLE_MODE.UNIQUE
    );
    return tf;
}
