import { nanoid } from 'nanoid';
import { createEntity } from '../entity';
import { CreateStatement } from '../parser';
import { Entity } from './../entity/index';


export type Union = {
    id: string,
    name: string,
    entities: Map<string, Entity>
}

function Union(this: Union, entities: Entity[]) {
    this.entities = new Map(entities.map(_ => [_.name, _]));
}

Union.prototype.setName = function (name: string) {
    this.name = name;
}

Union.prototype.setId = function (id: string) {
    this.id = id;
}

Union.prototype.write = function (offset, data) {
    console.log(this, "Tries to write");
}

Union.prototype.read = function (offset, amount) {
    console.log(this, "Tries to read");
}


export function getUnion(ents: Entity[]) {
    const union = new Union(ents);

    return union;
}

export function createUnion(req: CreateStatement) {
    const columns: Entity[] = [];
    for (const column of req.columns)
        columns.push(createEntity(column));
    const union = new Union(columns);
    union.setName(req.target?.name);
    union.setId(nanoid());
    return union;
}
