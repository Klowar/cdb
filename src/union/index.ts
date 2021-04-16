import { nanoid } from 'nanoid';
import { createEntity } from '../entity';
import { CreateStatement, Statement } from '../parser';
import { Entity } from './../entity/index';


export type Union = {
    id: string;
    name: string;
    entities: Map<string, Entity>;
    setName: (name: string) => void;
    setId: (id: string) => void;
    write: (statement: Statement) => boolean;
    read: (statement: Statement) => any;
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

Union.prototype.write = function (this: Union, statement: Statement) {
    console.log(this, "Tries to write");
}

Union.prototype.read = function (this: Union, statement: Statement) {
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
