import { createUnion } from '../union';
import { Cache, newCache } from './../cache/index';
import { STATEMENTS } from './../parser/constants';
import { AlterStatement, CreateStatement, DeleteStatement, DropStatement, InsertStatement, Root, SelectStatement, UpdateStatement } from './../parser/types';


export type Processor = {
    cache: Cache;
    process: (query: Root) => any;
    drop: (query: DropStatement) => any;
    alter: (query: AlterStatement) => any;
    create: (query: CreateStatement) => any;
    select: (query: SelectStatement) => any;
    insert: (query: InsertStatement) => any;
    update: (query: UpdateStatement) => any;
    delete: (query: DeleteStatement) => any;
}

function Processor(this: Processor, config) {
    this.cache = newCache({});
}

Processor.prototype.process = function (this: Processor, query: Root) {
    console.log("General method for calling", query);
    if (query.statement == null) return;
    switch (query.statement.type) {
        case STATEMENTS.DDL.CREATE:
            return this.create(query.statement as CreateStatement);
        default:
            return Error("No method realized");
    }
}

Processor.prototype.create = function (this: Processor, query: CreateStatement) {
    console.log("process create query", query);
    if (query.target?.name && this.cache.has(query.target?.name)) return "Table already exists";
    const union = createUnion(query);
    this.cache.addUnion(union);
    return union;

}

Processor.prototype.drop = function (this: Processor, query: DropStatement) {
    console.log("process drop query", query);
}

Processor.prototype.alter = function (this: Processor, query: AlterStatement) {
    console.log("process alter query", query);
}

Processor.prototype.select = function (this: Processor, query: SelectStatement) {
    console.log("process select query", query);
}

Processor.prototype.insert = function (this: Processor, query: InsertStatement) {
    console.log("process insert query", query);
}

Processor.prototype.update = function (this: Processor, query: UpdateStatement) {
    console.log("process update query", query);
}

Processor.prototype.delete = function (this: Processor, query: DeleteStatement) {
    console.log("process delete query", query);
}

let processorInstance: Processor | null = null;

export function getProcessor(config): Processor | null {
    return processorInstance;
}

export function newProseccor(config): Processor {
    return processorInstance = new Processor(config);
}

