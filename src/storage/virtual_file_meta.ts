import {promisify} from 'util';
import {stat, Stats} from 'fs';

const statP = promisify(stat);

function virtualFileMeta(path: string) {
    this.path = path;
    this.meta = null;
}

virtualFileMeta.prototype.setMeta = function(meta: Stats) {
    this.meta = meta;
}

export function getFileMeta(path: string) {
    const meta = new virtualFileMeta(path);
    statP(path).then(meta.setMeta);
    return meta;
}

