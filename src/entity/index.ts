import { nanoid } from 'nanoid';
import { Cache, newCache } from './../cache/index';
import { TypedIdentifier, Option } from './../parser/types';



export type Entity = {
    cache: Cache;
    index: number;
    name: string;
    id: string;
    setName: (name: string) => void;
    setId: (id: string) => void;
    getType: () => string;
    getIndex: () => number;
    setIndex: (index: number) => void;
    getIndices: (value: string | number) => Promise<number[]>;
    write: (data: string | number) => Promise<any>;
    update: (records: number[], data: string | number) => Promise<any>;
    read: (records: number[]) => Promise<any>;
    delete: (records: number[]) => Promise<any>;
}

function Entity(this: Entity, cache: Cache) {
    this.cache = cache;
}

Entity.prototype.getType = function (this: Entity, name: string) {
    return this.cache.getDataType();
}

Entity.prototype.setName = function (this: Entity, name: string) {
    this.name = name;
}

Entity.prototype.setId = function (this: Entity, id: string) {
    this.id = id;
}

Entity.prototype.getIndex = function (this: Entity) {
    return this.index;
}

Entity.prototype.setIndex = function (this: Entity, index: number) {
    this.index = index;
}

Entity.prototype.getIndices = async function (this: Entity, data: string | number) {
    return this.cache.getIndices(data);
}

Entity.prototype.write = function (this: Entity, data: string | number) {
    console.log(this, "Tries to write entity");
    return this.cache.write(data);
}

Entity.prototype.update = function (this: Entity, records: number[], data: string | number) {
    console.log(this, "Tries to update entity");
    return this.cache.update(records, data);
}

Entity.prototype.read = function (this: Entity, records: number[]) {
    console.log(this, "Tries to read entity");
    return this.cache.read(records);
}

Entity.prototype.delete = function (this: Entity, records: number[]) {
    console.log(this, "Tries to read entity");
}


export function getEntity(cache: Cache): Entity {
    const vf = new Entity(cache);
    return vf;
}

export function createEntity(req: TypedIdentifier, options?: Option): Entity {
    const cache = newCache(req, options);
    const entity = new Entity(cache);
    entity.setIndex(req.index);
    entity.setName(req.name);
    entity.setId(nanoid());
    return entity;
}

