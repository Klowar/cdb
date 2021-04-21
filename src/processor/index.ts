import { createUnion } from '../union';
import { Cache, newCache } from './../cache/index';
import { STATEMENTS } from './../parser/constants';
import { AlterStatement, CreateStatement, DeleteStatement, DropStatement, InsertStatement, Root, SelectStatement, Statement, UpdateStatement } from './../parser/types';

export type Request<T> = {
    statement: T,
    filter?: number[]
}

function Request(this: Request<Statement>, statement: Statement) {
    this.statement = statement;
}

export type Processor = {
    cache: Cache;
    process: (query: Root) => Promise<any>;
    drop: (query: DropStatement) => Promise<any>;
    alter: (query: AlterStatement) => Promise<any>;
    create: (query: CreateStatement) => Promise<any>;
    select: (query: SelectStatement) => Promise<any>;
    insert: (query: InsertStatement) => Promise<any>;
    update: (query: UpdateStatement) => Promise<any>;
    delete: (query: DeleteStatement) => Promise<any>;
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
        case STATEMENTS.DDL.DROP:
            return this.drop(query.statement as DropStatement);
        case STATEMENTS.DML.INSERT:
            return this.insert(query.statement as InsertStatement);
        case STATEMENTS.DML.SELECT:
            return this.select(query.statement as SelectStatement);
        default:
            return Error("No method realized");
    }
}

Processor.prototype.create = function (this: Processor, query: CreateStatement) {
    console.log("process create query", query);
    if (query.target?.name && this.cache.has(query.target?.name)) return "Table already exists";
    return createUnion(query).then((union) => this.cache.addUnion(union));
}

Processor.prototype.drop = function (this: Processor, query: DropStatement) {
    console.log("process drop query", query);
    if (query.target?.name != null && !this.cache.has(query.target?.name)) return "Table does not exists";
    return new Promise((res) => res(query.target != null ? this.cache.remove(query.target.name) : false));
}

Processor.prototype.alter = function (this: Processor, query: AlterStatement) {
    console.log("process alter query", query);
}

Processor.prototype.select = function (this: Processor, query: SelectStatement) {
    console.log("process select query", query);
    return this.cache.read(new Request(query));
}

Processor.prototype.insert = function (this: Processor, query: InsertStatement) {
    console.log("process insert query", query);
    return this.cache.write(new Request(query));
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

