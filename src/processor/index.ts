import { createUnion } from '../union';
import { STATEMENTS, TABLE_KIND } from './../parser/constants';
import { AlterStatement, CreateStatement, DeleteStatement, DropStatement, InsertStatement, Root, SelectStatement, Statement, UpdateStatement } from './../parser/types';
import { Union } from './../union/index';

export type Request<T> = {
    statement: T,
    filter?: number[]
}

function Request(this: Request<Statement>, statement: Statement) {
    this.statement = statement;
}

export type Processor = {
    unions: Map<string, Union>;
    addUnion: (union: Union) => Promise<any>;
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
    this.unions = new Map<string, Union>();
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

Processor.prototype.addUnion = function (this: Processor, union: Union) {
    this.unions.set(union.name, union);
}

Processor.prototype.has = function (this: Processor, name: string) {
    return this.unions.has(name);
}

Processor.prototype.get = function (this: Processor, name: string) {
    return this.unions.get(name);
}

Processor.prototype.remove = function (this: Processor, name: string) {
    return this.unions.delete(name);
}

Processor.prototype.create = function (this: Processor, query: CreateStatement) {
    console.log("process create query", query);
    if (query.target?.name && this.unions.has(query.target?.name)) return "Table already exists";
    switch(query.object) {
        case TABLE_KIND.TABLE:
        case TABLE_KIND.UNIQUE_TABLE:
            return createUnion(query).then((union) => this.addUnion(union));
        default:
            throw new Error("Unknown object to create");
    }
}

Processor.prototype.drop = function (this: Processor, query: DropStatement) {
    console.log("process drop query", query);
    if (query.target?.name != null && !this.unions.has(query.target?.name)) return "Table does not exists";
    return new Promise((res) => res(query.target != null ? this.unions.delete(query.target.name) : false));
}

Processor.prototype.alter = function (this: Processor, query: AlterStatement) {
    console.log("process alter query", query);
}

Processor.prototype.select = function (this: Processor, query: SelectStatement) {
    console.log("process select query", query);
    if (query.target) return this.unions.get(query.target.name)?.read(new Request(query));
    else return new Promise(res => res("No read target"));
}

Processor.prototype.insert = function (this: Processor, query: InsertStatement) {
    console.log("process insert query", query);
    if (query.target) return this.unions.get(query.target.name)?.write(new Request(query));
    else return new Promise(res => res("No write target"));
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

