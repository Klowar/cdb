import { DeleteStatement, InsertStatement, SelectStatement, UpdateStatement } from './../parser/types';
import { Request } from './../processor/index';
import { Union } from './../union/index';

export type Cache = {
    unionCache: Map<string, Map<string, Map<string, string>>>;
    unions: Map<string, Union>;
    addUnion: (union: Union) => void;
    has: (name: string) => boolean;
    get: (name: string) => Union | undefined;
    remove: (name: string) => boolean;
    write: (statement: Request<InsertStatement>) => Promise<any>;
    update: (statement: Request<UpdateStatement>) => Promise<any>;
    read: (statement: Request<SelectStatement>) => Promise<any>;
    delete: (statement: Request<DeleteStatement>) => Promise<any>;
}

function Cache(this: Cache, config: {}) {
    // Each union has entity map and each entity map has padding to record mapping
    this.unionCache = new Map<string, Map<string, Map<string, string>>>();
    this.unions = new Map<string, Union>();
}

Cache.prototype.addUnion = function (this: Cache, union: Union) {
    this.unions.set(union.name, union);
}

Cache.prototype.has = function (this: Cache, name: string) {
    return this.unions.has(name);
}

Cache.prototype.get = function (this: Cache, name: string) {
    return this.unions.get(name);
}

Cache.prototype.remove = function (this: Cache, name: string) {
    return this.unions.delete(name);
}

Cache.prototype.write = function (this: Cache, req: Request<InsertStatement>) {
    console.log(this, "Tries to write cache");
    if (req.statement.target) return this.unions.get(req.statement.target.name)?.write(req);
    else return new Promise(res => res("No write target"));
}

Cache.prototype.update = function (this: Cache, req: Request<UpdateStatement>) {
    console.log(this, "Tries to update cache");
}

Cache.prototype.read = function (this: Cache, req: Request<SelectStatement>) {
    console.log(this, "Tries to read cache");
    if (req.statement.target) return this.unions.get(req.statement.target.name)?.read(req);
    else return new Promise(res => res("No write target"));
}

Cache.prototype.delete = function (this: Cache, req: Request<DeleteStatement>) {
    console.log(this, "Tries to delete cache");
}

let cacheInstance: Cache | null = null;

export function getCache(): Cache | null {
    return cacheInstance;
}

export function newCache(config: {}): Cache {
    return cacheInstance = new Cache(config);
}
