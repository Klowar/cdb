import { getBlockSize } from '../entity/util';
import { Literal, TypedIdentifier } from './../parser/types';
import { createTemporaryFile, TemporaryFile } from './../temp/index';



export type Cache = {
    data: Map<string, any>;
    tf: TemporaryFile;
    getDataType: () => string;
    getIndices: (data: string | number) => Promise<number[]>;
    write: (data: string | number) => Promise<any>;
    update: (records: number[], data: Literal) => Promise<any>;
    read: (records: number[] | undefined) => Promise<any>;
    delete: (records: number[]) => Promise<any>;
}

function Cache(this: Cache, tf: TemporaryFile) {
    this.tf = tf;
    this.data = new Map<string, any>();
}

Cache.prototype.getDataType = function (this: Cache) {
    return this.tf.getDataType();
}

Cache.prototype.getIndices = async function (this: Cache, data: string | number) {
    return this.tf.getIndices(data);
}

Cache.prototype.write = function (this: Cache, data: string | number) {
    console.log(this, "Tries to write cache");
    return this.tf.write(data);
}

Cache.prototype.update = function (this: Cache, records: number[] | undefined, data: string | number) {
    console.log(this, "Tries to update cache");
}

Cache.prototype.read = function (this: Cache, records: number[] | undefined) {
    console.log(this, "Tries to read cache");
    return this.tf.read(records);
}

Cache.prototype.delete = function (this: Cache, records: number[]) {
    console.log(this, "Tries to delete cache");
}


export function getCache(tf: TemporaryFile): Cache | null {
    return new Cache(tf);
}

export function newCache(req: TypedIdentifier): Cache {
    const tf = createTemporaryFile();
    tf.setDataType(req.type);
    tf.setBlockSize(req.size ? Number(req.size) : getBlockSize(req.type));
    return new Cache(tf);
}