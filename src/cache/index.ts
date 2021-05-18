import { getBlockSize } from '../entity/util';
import { DeleteStatement, Literal, TypedIdentifier, UpdateStatement } from './../parser/types';
import { Request } from './../processor/index';
import { createTemporaryFile, TemporaryFile } from './../temp/index';



export type Cache = {
    data: Map<string, any>;
    tf: TemporaryFile;
    getDataType: () => string;
    getIndices: (value: Literal) => Promise<number[]>;
    write: (statement: Literal) => Promise<any>;
    update: (statement: Request<UpdateStatement>) => Promise<any>;
    read: (statement: number[] | undefined) => Promise<any>;
    delete: (statement: Request<DeleteStatement>) => Promise<any>;
}

function Cache(this: Cache, tf: TemporaryFile) {
    this.tf = tf;
    this.data = new Map<string, any>();
}

Cache.prototype.getDataType = function (this: Cache) {
    return this.tf.getDataType();
}

Cache.prototype.getIndices = async function (this: Cache, value: Literal) {
    return this.tf.getIndices(value);
}

Cache.prototype.write = function (this: Cache, req: Literal) {
    console.log(this, "Tries to write cache");
    return this.tf.write(req);
}

Cache.prototype.update = function (this: Cache, req: Request<UpdateStatement>) {
    console.log(this, "Tries to update cache");
}

Cache.prototype.read = function (this: Cache, req: number[] | undefined) {
    console.log(this, "Tries to read cache");
    return this.tf.read(req);
}

Cache.prototype.delete = function (this: Cache, req: Request<DeleteStatement>) {
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