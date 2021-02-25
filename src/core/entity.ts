import { getVirtualFile, VirtualFile } from '../storage/virtual_file';

export type DatabaseEntity = {
    path: string;
    blockSize: number;
    uniqueBlocks: number;
    vf: null | VirtualFile;
    encoding: null;
}

function databaseEntity(obj) {
    this.path = obj.path;
    this.blockSize = obj.blockSize;
    this.uniqueBlocks = obj.uniqueBlocks;
    // Lazy init fields
    this.vf = null;
    this.encoding = null;
}

databaseEntity.prototype.setVf = function(vf) {
    this.vf = vf;
}

databaseEntity.prototype.setEncoding = function(enc) {
    this.encoding = enc;
}


export function initDb(config, map: Map<number, DatabaseEntity>) {
    for(const key of Object.keys(config)) {
        const object = new databaseEntity(config[key])
        object.setVf(getVirtualFile(object.path));
        map.set(Number(key), object);
    }
}