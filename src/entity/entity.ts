import { VirtualFile } from '../storage/virtual_file';

export type DBEntity = {
    path: string;
    blockSize: number;
    uniqueBlocks: number;
    vf: null | VirtualFile;
    encoding: null;
    meta: DBEMeta;
}

export type DBEMeta = {
    blocks: number;
    uniqueBlocks: number;
    blockSize: number;
    encoding: number;
}

export function databaseEntity(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.path = obj.path;
    this.meta = obj.meta;
    // Lazy init fields
    this.vf = null;
}

databaseEntity.prototype.setVf = function(vf) {
    this.vf = vf;
}

databaseEntity.prototype.setEncoding = function(enc) {
    this.encoding = enc;
}
