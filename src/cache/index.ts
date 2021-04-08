import { Union } from './../union/index';

export type CacheType = {
    unionCache: Map<string, Map<string, Map<string, string>>>,
    unions: Map<string, Union>
}

function Cache(this: CacheType, config: {}) {
    // Each union has entity map and each entity map has padding to record mapping
    this.unionCache = new Map<string, Map<string, Map<string, string>>>();
    this.unions = new Map<string, Union>();
}

Cache.prototype.addUnion = function (union: Union) {
    this.unions.set(union.name, union);
}

Cache.prototype.write = function (offset, data) {
    console.log(this, "Tries to write");
}

Cache.prototype.read = function (offset, amount) {
    console.log(this, "Tries to read");
}

let cacheInstance = null;

export function getCache() {
    return cacheInstance;
}

export function newCache(config: {}) {
    return cacheInstance = new Cache(config);
}
