import { MetaFile } from './../meta/meta_file';


export type Entity = {
    mf: MetaFile,
    name: string,
    id: string
}

function Entity(mf: MetaFile) {
    this.mf = mf;
}

Entity.prototype.setName = function(name: string) {
    this.name = name;
}

Entity.prototype.setId = function(id: string) {
    this.id = id;
}

Entity.prototype.write = function (offset, data) {
    console.log(this, "Tries to write to data file");
}

Entity.prototype.read = function (offset, amount) {
    console.log(this, "Tries to read the data file");
}


export function getEntity(mf: MetaFile) {
    const vf = new Entity(mf);
    return vf;
}

