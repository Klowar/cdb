import { nanoid } from 'nanoid';
import { createEntity } from '../entity';
import { AmmscBase } from '../entity/functions';
import { CreateStatement } from '../parser';
import { AmmscStore } from './../entity/functions/index';
import { Entity } from './../entity/index';
import { Ammsc, BinaryExpression, DeleteStatement, Identifier, InsertStatement, Literal, SelectStatement, UpdateStatement } from './../parser/types';
import { planarize } from './filter';
import { Union } from './index';
import { castTo } from './util';


export type UniqueUnion = Union;

UniqueUnion.prototype = new Union([]);
function UniqueUnion(this: UniqueUnion, entities: Entity[]) {
    Union.call(this, entities);
}

UniqueUnion.prototype.write = async function (this: UniqueUnion, statement: InsertStatement) {
    console.log(this, "Tries to write UniqueUnion");
    const arr = new Array(statement.values.length);
    for (const entity of this.entities.values())
        arr[entity.getIndex()] = entity.write(castTo(entity.getType(), statement.values[entity.index]).value);
    return Promise.all(arr);
}

UniqueUnion.prototype.update = async function (this: UniqueUnion, statement: UpdateStatement) {
    console.log(this, "Tries to update UniqueUnion");
    const filter = await this.filter.processWhere(statement);
    const planeWhere = planarize(statement.where as BinaryExpression);
    const arr = new Array(planeWhere.length);
    for (const biExp of planeWhere) {
        const entity = this.getEntity((biExp.lParam as Identifier).name);
        arr[entity.getIndex()] = entity.update(filter, castTo(entity.getType(), biExp.rParam as Literal).value);
    }
    return Promise.all(arr);
}

UniqueUnion.prototype.read = async function (this: UniqueUnion, statement: SelectStatement) {
    console.log(this, "Tries to read UniqueUnion");
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

UniqueUnion.prototype.delete = function (this: UniqueUnion, req: DeleteStatement) {
    console.log(this, "Tries to delete UniqueUnion");
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
