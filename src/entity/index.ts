import { nanoid } from 'nanoid';
import { createMetaFile, MetaFile } from '../meta';
import { InsertStatement, SelectStatement, TypedIdentifier, UpdateStatement } from './../parser/types';


export type Entity = {
    mf: MetaFile;
    name: string;
    type: string;
    id: string;
    setName: (name: string) => void;
    setId: (id: string) => void;
    setType: (type: string) => void;
    write: (statement: InsertStatement) => any;
    update: (statement: UpdateStatement) => any;
    read: (statement: SelectStatement) => any;
}

function Entity(this: Entity, mf: MetaFile) {
    this.mf = mf;
}

Entity.prototype.setName = function (this: Entity, name: string) {
    this.name = name;
}

Entity.prototype.setId = function (this: Entity, id: string) {
    this.id = id;
}

Entity.prototype.setType = function (this: Entity, type: string) {
    this.type = type;
}

Entity.prototype.write = function (this: Entity, statement: InsertStatement) {
    console.log(this, "Tries to write to data file");
}

Entity.prototype.update = function (this: Entity, statement: UpdateStatement) {
    console.log(this, "Tries to write to data file");
}

Entity.prototype.read = function (this: Entity, statement: SelectStatement) {
    console.log(this, "Tries to read the data file");
}


export function getEntity(mf: MetaFile): Entity {
    const vf = new Entity(mf);
    return vf;
}

export function createEntity(req: TypedIdentifier): Entity {
    const entity = new Entity(createMetaFile());
    entity.setType(req.type);
    entity.setName(req.name);
    entity.setId(nanoid());
    return entity;
}

