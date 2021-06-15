import { uniqBy } from 'lodash';
import { nanoid } from 'nanoid';
import { AmmscBase, AmmscStore } from './../entity/functions/index';
import { createEntity, Entity } from './../entity/index';
import { Ammsc, CreateStatement, DeleteStatement, Identifier, InsertStatement, Literal, SelectStatement, UpdateStatement } from './../parser/types';
import { Filter, planarize } from './filter';
import { castTo } from './util';


export type Union = {
    id: string;
    name: string;
    entities: Map<string, Entity>;
    filter: Filter;
    hasEntity: (name: string) => boolean;
    getEntity: (name: string) => Entity;
    setName: (name: string) => void;
    setId: (id: string) => void;
    write: (statement: InsertStatement) => Promise<any>;
    update: (statement: UpdateStatement) => Promise<any>;
    read: (statement: SelectStatement) => Promise<any>;
    delete: (statement: DeleteStatement) => Promise<any>;
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

Union.prototype.write = async function (this: Union, statement: InsertStatement) {
    console.log("Write Union");
    const arr = new Array(statement.values.length);
    for (const entity of this.entities.values())
        arr[entity.getIndex()] = entity.write(castTo(entity.getType(), statement.values[entity.index]).value);
    return Promise.all(arr);
}

Union.prototype.update = async function (this: Union, statement: UpdateStatement) {
    console.log("Update Union");
    const filter = statement.where != null
        ? await this.filter.getMatchingIndices(statement.where)
        : [];
    const planeExpr = uniqBy(planarize(statement.expression), (_) => (_.lParam as Identifier).name);
    const arr = new Array(planeExpr.length);
    for (const biExp of planeExpr) {
        const entity = this.getEntity((biExp.lParam as Identifier).name);
        arr[entity.getIndex()] = entity.update(filter, castTo(entity.getType(), biExp.rParam as Literal).value);
    }
    return Promise.all(arr);
}

Union.prototype.read = async function (this: Union, statement: SelectStatement) {
    console.log("Read Union");
    const filter = statement.where != null
        ? await this.filter.getMatchingIndices(statement.where)
        : [];
    const arr = new Array(statement.columns.length);
    for (const entity of statement.columns) {
        const target: AmmscBase | Entity = this.hasEntity(entity.name)
            ? this.getEntity(entity.name)
            : AmmscStore.get(entity as Ammsc, this);
        arr[target.getIndex()] = target.read(filter);
    }
    return Promise.all(arr);
}

Union.prototype.delete = function (this: Union, req: DeleteStatement) {
    console.log("Delete Union");
}

export function getUnion(ents: Entity[]): Promise<Union> {
    const union = new Union(ents);

    return new Promise((res) => res(union));
}

export function createUnion(req: CreateStatement): Promise<Union> {
    const columns: Entity[] = [];
    for (const column of req.columns)
        columns.push(createEntity(column, req.options));
    const union = new Union(columns);
    union.setName(req.target?.name);
    union.setId(nanoid());
    return new Promise((res) => res(union));
}
