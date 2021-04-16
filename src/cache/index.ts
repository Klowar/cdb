import { InsertStatement, SelectStatement, UpdateStatement } from './../parser/types';
import { Union } from './../union/index';

export type Cache = {
    unionCache: Map<string, Map<string, Map<string, string>>>;
    unions: Map<string, Union>;
    addUnion: (union: Union) => void;
    has: (name: string) => boolean;
    get: (name: string) => Union | undefined;
    remove: (name: string) => boolean;
    write: (statement: InsertStatement) => any;
    update: (statement: UpdateStatement) => any;
    read: (statement: SelectStatement) => any;
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

Cache.prototype.write = function (this: Cache, statement: InsertStatement) {
    console.log(this, "Tries to write");
    if (statement.target) return this.unions.get(statement.target.name)?.write(statement);
    else return "No write target";
}

Cache.prototype.update = function (this: Cache, statement: UpdateStatement) {
    console.log(this, "Tries to update");
}

Cache.prototype.read = function (this: Cache, statement: SelectStatement) {
    console.log(this, "Tries to read");
}

let cacheInstance: Cache | null = null;

export function getCache(): Cache | null {
    return cacheInstance;
}

export function newCache(config: {}): Cache {
    return cacheInstance = new Cache(config);
}
