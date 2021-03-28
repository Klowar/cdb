import { Entity } from '../entity';


export type Union = {
    entities: Map<string, Entity>
}

function Union(entities: Entity[]) {
    this.entities = entities;
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
