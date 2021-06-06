import { nanoid } from 'nanoid';
import { createEntity } from '../entity';
import { CreateStatement } from '../parser';
import { AmmscStore } from './../entity/functions/index';
import { Entity } from './../entity/index';
import { Ammsc, DeleteStatement, InsertStatement, SelectStatement, UpdateStatement } from './../parser/types';
import { Request } from './../processor/index';
import { Union } from './index';


export type UniqueUnion = Union;

UniqueUnion.prototype = new Union([]);
function UniqueUnion(this: UniqueUnion, entities: Entity[]) {
    Union.call(this, entities);
}

UniqueUnion.prototype.write = async function (this: UniqueUnion, req: Request<InsertStatement>) {
    console.log(this, "Tries to write UniqueUnion");
    const arr = new Array(req.statement.values.length);
    for (const entity of this.entities.values())
        arr.push(entity.write(req));
    return Promise.all(arr);
}

UniqueUnion.prototype.update = function (this: UniqueUnion, req: Request<UpdateStatement>) {
    console.log(this, "Tries to update UniqueUnion");
}

UniqueUnion.prototype.read = async function (this: UniqueUnion, req: Request<SelectStatement>) {
    console.log(this, "Tries to read UniqueUnion");
    req.filter = await this.filter.processWhere(req.statement);
    const arr = new Array(req.statement.columns.length);
    for (const entity of req.statement.columns) {
        const target = this.hasEntity(entity.name)
            ? this.getEntity(entity.name)
            : AmmscStore.get(entity as Ammsc, this);
        arr.push(target.read(req));
    }
    return Promise.all(arr);
}

UniqueUnion.prototype.delete = function (this: UniqueUnion, req: Request<DeleteStatement>) {
    console.log(this, "Tries to delete unioun");
}


export function getUniqueUnion(ents: Entity[]): Promise<UniqueUnion> {
    const union = new UniqueUnion(ents);

    return new Promise((res) => res(union));
}

export function createUniqueUnion(req: CreateStatement): Promise<UniqueUnion> {
    const columns: Entity[] = [];
    for (const column of req.columns)
        columns.push(createEntity(column));
    const union = new UniqueUnion(columns);
    union.setName(req.target?.name);
    union.setId(nanoid());
    return new Promise((res) => res(union));
}
