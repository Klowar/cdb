import { nanoid } from 'nanoid';
import { Union } from '.';
import { createEntity } from '../entity';
import { CreateStatement } from '../parser';
import { AmmscStore } from './../entity/functions/index';
import { Entity } from './../entity/index';
import { Ammsc, DeleteStatement, InsertStatement, SelectStatement, UpdateStatement } from './../parser/types';
import { Request } from './../processor/index';


export type LinkedUnion = Union;

LinkedUnion.prototype = new Union([]);
function LinkedUnion(this: LinkedUnion, entities: Entity[]) {
    Union.call(this, entities);
}

LinkedUnion.prototype.write = async function (this: LinkedUnion, req: Request<InsertStatement>) {
    console.log(this, "Tries to write LinkedUnion");
    const arr = new Array(req.statement.values.length);
    for (const entity of this.entities.values())
        arr.push(entity.write(req));
    return Promise.all(arr);
}

LinkedUnion.prototype.update = function (this: LinkedUnion, req: Request<UpdateStatement>) {
    console.log(this, "Tries to update LinkedUnion");
}

LinkedUnion.prototype.read = async function (this: LinkedUnion, req: Request<SelectStatement>) {
    console.log(this, "Tries to read LinkedUnion");
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

LinkedUnion.prototype.delete = function (this: LinkedUnion, req: Request<DeleteStatement>) {
    console.log(this, "Tries to delete unioun");
}


export function getLinkedUnion(ents: Entity[]): Promise<LinkedUnion> {
    const union = new LinkedUnion(ents);

    return new Promise((res) => res(union));
}

export function createLinkedUnion(req: CreateStatement): Promise<LinkedUnion> {
    const columns: Entity[] = [];
    for (const column of req.columns)
        columns.push(createEntity(column));
    const union = new LinkedUnion(columns);
    union.setName(req.target?.name);
    union.setId(nanoid());
    return new Promise((res) => res(union));
}
