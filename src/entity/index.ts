import { nanoid } from 'nanoid';
import { Request } from '../processor';
import { Cache, newCache } from './../cache/index';
import { DeleteStatement, InsertStatement, Literal, SelectStatement, TypedIdentifier, UpdateStatement } from './../parser/types';
import { castTo } from './util';


export type Entity = {
    cache: Cache;
    index: number;
    name: string;
    type: string;
    id: string;
    setName: (name: string) => void;
    setId: (id: string) => void;
    setType: (type: string) => void;
    getIndex: () => number;
    setIndex: (index: number) => void;
    getIndices: (value: Literal) => Promise<number[]>;
    write: (request: Request<InsertStatement>) => Promise<any>;
    update: (statement: Request<UpdateStatement>) => Promise<any>;
    read: (statement: Request<SelectStatement>) => Promise<any>;
    delete: (statement: Request<DeleteStatement>) => Promise<any>;
}

function Entity(this: Entity, cache: Cache) {
    this.cache = cache;
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

Entity.prototype.getIndex = function (this: Entity) {
    return this.index;
}

Entity.prototype.setIndex = function (this: Entity, index: number) {
    this.index = index;
}

Entity.prototype.getIndices = async function (this: Entity, value: Literal) {
    return this.cache.getIndices(castTo(this.type, value));
}

Entity.prototype.write = function (this: Entity, req: Request<InsertStatement>) {
    console.log(this, "Tries to write entity");
    return this.cache.write(castTo(this.type, req.statement.values[this.index]));
}

Entity.prototype.update = function (this: Entity, req: Request<UpdateStatement>) {
    console.log(this, "Tries to update entity");
}

Entity.prototype.read = function (this: Entity, req: Request<SelectStatement>) {
    console.log(this, "Tries to read entity");
    return this.cache.read(req);
}

Entity.prototype.delete = function (this: Entity, req: Request<DeleteStatement>) {
    console.log(this, "Tries to read entity");
}


export function getEntity(cache: Cache): Entity {
    const vf = new Entity(cache);
    return vf;
}

export function createEntity(req: TypedIdentifier): Entity {
    const cache = newCache(req);
    const entity = new Entity(cache);
    entity.setIndex(req.index);
    entity.setType(req.type);
    entity.setName(req.name);
    entity.setId(nanoid());
    return entity;
}

