import { ProcessorType } from './../processor/index';
import { MAX_MEMORY_USAGE } from './constants';

export type MemoryManagerType = {
    requestProcessor: ProcessorType,
    requestQuery: any[]
}

function MemoryManager(config) {
    this.requestProcessor = config.processor;
    this.requestQuery = [];
}

MemoryManager.prototype.process = function (request: any) {
    const usage = process.memoryUsage();
    if (usage.rss >= MAX_MEMORY_USAGE * 0.9)
        return this.requestQuery.push(request);
    // TODO else
}

export function getMemoryManager(config) {
    return new MemoryManager(config);
}
