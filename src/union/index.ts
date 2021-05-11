import { nanoid } from 'nanoid';
import { createEntity } from '../entity';
import { CreateStatement } from '../parser';
import { Entity } from './../entity/index';
import { DeleteStatement, InsertStatement, SelectStatement, UpdateStatement } from './../parser/types';
import { Request } from './../processor/index';
import { Filter } from './filter';


export type Union = {
    id: string;
    name: string;
    entities: Map<string, Entity>;
    filter: Filter;
    getEntity: (name: string) => Entity;
    setName: (name: string) => void;
    setId: (id: string) => void;
    write: (statement: Request<InsertStatement>) => Promise<any>;
    update: (statement: Request<UpdateStatement>) => Promise<any>;
    read: (statement: Request<SelectStatement>) => Promise<any>;
    delete: (statement: Request<DeleteStatement>) => Promise<any>;
}

function Union(this: Union, entities: Entity[]) {
    this.entities = new Map(entities.map(_ => [_.name, _]));
    this.filter = new Filter(this);
}

Union.prototype.getEntity = function (this: Union, name: string) {
    return this.entities.get(name);
}

Union.prototype.setName = function (this: Union, name: string) {
    this.name = name;
}

Union.prototype.setId = function (this: Union, id: string) {
    this.id = id;
}

Union.prototype.write = async function (this: Union, req: Request<InsertStatement>) {
    console.log(this, "Tries to write union");
    const arr = new Array(req.statement.values.length);
    for (const entity of this.entities.values())
        arr.push(entity.write(req));
    return Promise.all(arr);
}

Union.prototype.update = function (this: Union, req: Request<UpdateStatement>) {
    console.log(this, "Tries to update union");
}

Union.prototype.read = async function (this: Union, req: Request<SelectStatement>) {
    console.log(this, "Tries to read union");
    req.filter = await this.filter.processWhere(req.statement);
    const arr = new Array(req.statement.columns.length);
    for(const entity of req.statement.columns) {
        arr.push(this.entities.get(entity.name)?.read(req));
    }
    return Promise.all(arr);
}

Union.prototype.delete = function (this: Union, req: Request<DeleteStatement>) {
    console.log(this, "Tries to delete unioun");
}


export function getUnion(ents: Entity[]): Promise<Union> {
    const union = new Union(ents);

    return new Promise((res) => res(union));
}

export function createUnion(req: CreateStatement): Promise<Union> {
    const columns: Entity[] = [];
    for (const column of req.columns)
        columns.push(createEntity(column));
    const union = new Union(columns);
    union.setName(req.target?.name);
    union.setId(nanoid());
    return new Promise((res) => res(union));
}
