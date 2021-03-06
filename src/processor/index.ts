import { logger } from './../globals';
import { STATEMENTS } from './../parser/constants';
import { AlterStatement, CreateStatement, DeleteStatement, DropStatement, InsertStatement, Root, SelectStatement, UpdateStatement } from './../parser/types';
import { createUnion, Union } from './../union/index';

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
        case STATEMENTS.DML.UPDATE:
            return this.update(query.statement as UpdateStatement);
        case STATEMENTS.DML.DELETE:
            return this.delete(query.statement as DeleteStatement);
        default:
            throw new Error("No method realized");
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
    logger.debug("process create query", query);
    if (query.target?.name && this.unions.has(query.target?.name)) return "Table already exists";
    return createUnion(query).then((union) => this.addUnion(union));
}

Processor.prototype.drop = function (this: Processor, query: DropStatement) {
    logger.debug("process drop query", query);
    if (query.target?.name != null && !this.unions.has(query.target?.name)) return "Table does not exists";
    return new Promise((res) => res(query.target != null ? this.unions.delete(query.target.name) : false));
}

Processor.prototype.alter = function (this: Processor, query: AlterStatement) {
    logger.debug("process alter query", query);
}

Processor.prototype.select = function (this: Processor, query: SelectStatement) {
    logger.debug("process select query", query);
    if (query.target) return this.unions.get(query.target.name)?.read(query);
    else return new Promise(res => res("No read target"));
}

Processor.prototype.insert = function (this: Processor, query: InsertStatement) {
    logger.debug("process insert query", query);
    if (query.target) return this.unions.get(query.target.name)?.write(query);
    else return new Promise(res => res("No write target"));
}

Processor.prototype.update = function (this: Processor, query: UpdateStatement) {
    logger.debug("process update query", query);
    if (query.target) return this.unions.get(query.target.name)?.update(query);
    else return new Promise(res => res("No write target"));
}

Processor.prototype.delete = function (this: Processor, query: DeleteStatement) {
    logger.debug("process delete query", query);
    if (query.target) return this.unions.get(query.target.name)?.delete(query);
    else return new Promise(res => res("No write target"));
}

let processorInstance: Processor | null = null;

export function getProcessor(config): Processor | null {
    return processorInstance;
}

export function newProseccor(config): Processor {
    return processorInstance = new Processor(config);
}

