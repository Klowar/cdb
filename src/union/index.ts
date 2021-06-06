import { Entity } from './../entity/index';
import { DeleteStatement, InsertStatement, SelectStatement, UpdateStatement } from './../parser/types';
import { Request } from './../processor/index';
import { Filter } from './filter';


export type Union = {
    id: string;
    name: string;
    entities: Map<string, Entity>;
    filter: Filter;
    hasEntity: (name: string) => boolean;
    getEntity: (name: string) => Entity;
    setName: (name: string) => void;
    setId: (id: string) => void;
    write: (statement: Request<InsertStatement>) => Promise<any>;
    update: (statement: Request<UpdateStatement>) => Promise<any>;
    read: (statement: Request<SelectStatement>) => Promise<any>;
    delete: (statement: Request<DeleteStatement>) => Promise<any>;
}

export function Union(this: Union, entities: Entity[]) {
    this.entities = new Map(entities.map(_ => [_.name, _]));
    this.filter = new Filter(this);
}

Union.prototype.getEntity = function (this: Union, name: string) {
    return this.entities.get(name);
}

Union.prototype.hasEntity = function (this: Union, name: string) {
    return this.entities.has(name);
}

Union.prototype.setName = function (this: Union, name: string) {
    this.name = name;
}

Union.prototype.setId = function (this: Union, id: string) {
    this.id = id;
}

Union.prototype.write = async function (this: Union, req: Request<InsertStatement>) {
    throw new Error("Unrealized Union type");
}

Union.prototype.update = function (this: Union, req: Request<UpdateStatement>) {
    throw new Error("Unrealized Union type");
}

Union.prototype.read = async function (this: Union, req: Request<SelectStatement>) {
    throw new Error("Unrealized Union type");
}

Union.prototype.delete = function (this: Union, req: Request<DeleteStatement>) {
    throw new Error("Unrealized Union type");
}
