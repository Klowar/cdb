import { nanoid } from 'nanoid';
import { createMetaFile, MetaFile } from '../meta';
import { TypedIdentifier } from './../parser/types';


export type Entity = {
    mf: MetaFile,
    name: string,
    type: string,
    id: string
}

function Entity(this: Entity, mf: MetaFile) {
    this.mf = mf;
}

Entity.prototype.setName = function (name: string) {
    this.name = name;
}

Entity.prototype.setId = function (id: string) {
    this.id = id;
}

Entity.prototype.setType = function (type: string) {
    this.type = type;
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

export function createEntity(req: TypedIdentifier) {
    const entity = new Entity(createMetaFile());
    entity.setType(req.type);
    entity.setName(req.name);
    entity.setId(nanoid());
    return entity;
}

