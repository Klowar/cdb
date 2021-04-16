import { nanoid } from 'nanoid';
import { createEntity } from '../entity';
import { CreateStatement } from '../parser';
import { Entity } from './../entity/index';
import { InsertStatement, SelectStatement, UpdateStatement } from './../parser/types';


export type Union = {
    id: string;
    name: string;
    entities: Map<string, Entity>;
    setName: (name: string) => void;
    setId: (id: string) => void;
    write: (statement: InsertStatement) => any;
    update: (statement: UpdateStatement) => any;
    read: (statement: SelectStatement) => any;
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
    console.log(this, "Tries to write");
}

Union.prototype.update = function (this: Union, statement: UpdateStatement) {
    console.log(this, "Tries to update");
}

Union.prototype.read = function (this: Union, statement: SelectStatement) {
    console.log(this, "Tries to read");
}


export function getUnion(ents: Entity[]): Union {
    const union = new Union(ents);

    return union;
}

export function createUnion(req: CreateStatement): Union {
    const columns: Entity[] = [];
    for (const column of req.columns)
        columns.push(createEntity(column));
    const union = new Union(columns);
    union.setName(req.target?.name);
    union.setId(nanoid());
    return union;
}
