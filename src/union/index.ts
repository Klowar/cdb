import { nanoid } from 'nanoid';
import { createEntity } from '../entity';
import { CreateStatement } from '../parser';
import { Entity } from './../entity/index';
import { DeleteStatement, InsertStatement, SelectStatement, UpdateStatement } from './../parser/types';


export type Union = {
    id: string;
    name: string;
    entities: Map<string, Entity>;
    setName: (name: string) => void;
    setId: (id: string) => void;
    write: (statement: InsertStatement) => Promise<any>;
    update: (statement: UpdateStatement) => Promise<any>;
    read: (statement: SelectStatement) => Promise<any>;
    delete: (statement: DeleteStatement) => Promise<any>;
}

function Union(this: Union, entities: Entity[]) {
    this.entities = new Map(entities.map(_ => [_.name, _]));
}

Union.prototype.setName = function (this: Union, name: string) {
    this.name = name;
}

Union.prototype.setId = function (this: Union, id: string) {
    this.id = id;
}

Union.prototype.write = function (this: Union, statement: InsertStatement) {
    console.log(this, "Tries to write union");
    const arr = new Array(statement.values.length);
    for (const entity of this.entities.values())
        arr.push(entity.write(statement));
    return Promise.all(arr);
}

Union.prototype.update = function (this: Union, statement: UpdateStatement) {
    console.log(this, "Tries to update union");
}

Union.prototype.read = function (this: Union, statement: SelectStatement) {
    console.log(this, "Tries to read union");
}

Union.prototype.delete = function (this: Union, statement: DeleteStatement) {
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
