import { CacheType } from './../cache/index';


export type ProcessorType = {
    cache: CacheType
}

function Processor(config) {
    this.cache = config.cache;
}

Processor.prototype.process = function (query) {
    console.log("General method for calling");
}

Processor.prototype.create = function (query) {
    console.log("process create query", query);
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

export function getProcessort(config) {
    return new Processor(config);
}

