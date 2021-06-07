import { nanoid } from 'nanoid';
import { Union } from '.';
import { createEntity } from '../entity';
import { AmmscBase } from '../entity/functions';
import { CreateStatement } from '../parser';
import { AmmscStore } from './../entity/functions/index';
import { Entity } from './../entity/index';
import { Ammsc, BinaryExpression, DeleteStatement, Identifier, InsertStatement, Literal, SelectStatement, UpdateStatement } from './../parser/types';
import { planarize } from './filter';
import { castTo } from './util';


export type LinkedUnion = Union;

LinkedUnion.prototype = new Union([]);
function LinkedUnion(this: LinkedUnion, entities: Entity[]) {
    Union.call(this, entities);
}

LinkedUnion.prototype.write = async function (this: LinkedUnion, statement: InsertStatement) {
    console.log(this, "Tries to write LinkedUnion");
    const arr = new Array(statement.values.length);
    for (const entity of this.entities.values())
        arr[entity.getIndex()] = entity.write(castTo(entity.getType(), statement.values[entity.index]).value);
    return Promise.all(arr);
}

LinkedUnion.prototype.update = async function (this: LinkedUnion, statement: UpdateStatement) {
    console.log(this, "Tries to update LinkedUnion");
    const filter = await this.filter.processWhere(statement);
    const planeWhere = planarize(statement.where as BinaryExpression);
    const arr = new Array(planeWhere.length);
    for (const biExp of planeWhere) {
        const entity = this.getEntity((biExp.lParam as Identifier).name);
        arr[entity.getIndex()] = entity.update(filter, castTo(entity.getType(), biExp.rParam as Literal).value);
    }
    return Promise.all(arr);
}

LinkedUnion.prototype.read = async function (this: LinkedUnion, statement: SelectStatement) {
    console.log(this, "Tries to read LinkedUnion");
    const filter = await this.filter.processWhere(statement);
    const arr = new Array(statement.columns.length);
    for (const entity of statement.columns) {
        const target: AmmscBase | Entity = this.hasEntity(entity.name)
            ? this.getEntity(entity.name)
            : AmmscStore.get(entity as Ammsc, this);
        arr[target.getIndex()] = target.read(filter);
    }
    return Promise.all(arr);
}

LinkedUnion.prototype.delete = function (this: LinkedUnion, req: DeleteStatement) {
    console.log(this, "Tries to delete LinkedUnion");
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
