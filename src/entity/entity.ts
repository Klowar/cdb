import { VirtualFile } from '../data/virtual_file';

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

export function dbeMeta(obj) {
    this.blocks = obj.blocks;
    this.uniqueBlocks = obj.uniqueBlocks
    this.blockSize = obj.blockSize;
    this.encoding = obj.encoding;
}

export function dbEntity(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.path = obj.path;
    this.meta = obj.meta;
    // Lazy init fields
    this.vf = null;
}

dbEntity.prototype.setVf = function(vf) {
    this.vf = vf;
}

dbEntity.prototype.setEncoding = function(enc) {
    this.encoding = enc;
}
