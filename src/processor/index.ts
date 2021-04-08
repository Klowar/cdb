import { Statement } from '../parser';
import { createUnion } from '../union';
import { CacheType, newCache } from './../cache/index';
import { STATEMENTS } from './../parser/constants';
import { CreateStatement, Root } from './../parser/types';


export type ProcessorType = {
    cache: CacheType
}

function Processor(this: ProcessorType, config) {
    this.cache = newCache({});
}

Processor.prototype.process = function (query: Root) {
    console.log("General method for calling", query);
    if (query.statement == null) return;
    switch (query.statement.type) {
        case STATEMENTS.DDL.CREATE:
            return this.create(query.statement);
        default:
            return Error("No method realized");
    }
}

Processor.prototype.create = function (query: CreateStatement) {
    console.log("process create query", query);
    const union = createUnion(query);
    this.cache.addUnion(union);
    return union;

}

Processor.prototype.drop = function (query) {
    console.log("process drop query", query);
}

Processor.prototype.alter = function (query) {
    console.log("process alter query", query);
}

Processor.prototype.select = function (query) {
    console.log("process select query", query);
}

Processor.prototype.insert = function (query) {
    console.log("process insert query", query);
}

Processor.prototype.update = function (query) {
    console.log("process update query", query);
}

Processor.prototype.delete = function (query) {
    console.log("process delete query", query);
}

let processorInstance = null;

export function getProcessor(config) {
    return processorInstance;
}

export function newProseccor(config) {
    return processorInstance = new Processor(config);
}

