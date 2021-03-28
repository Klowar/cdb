import { Union } from './../union/index';

export type CacheType = {
    unionCache: Map<string, Map<string, Map<string, string>>>,
    unions: Map<string, Union>
}

function Cache(config: {}) {
    // Each union has entity map and each entity map has padding to record mapping
    this.uniounCache = new Map<string, Map<string, Map<string, string>>>();
}

Cache.prototype.write = function (offset, data) {
    console.log(this, "Tries to write");
}

Cache.prototype.read = function (offset, amount) {
    console.log(this, "Tries to read");
}

export function getCache(config: {}) {
    return new Cache(config);
}
