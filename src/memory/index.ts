import { newProseccor, ProcessorType } from './../processor/index';
import { MAX_MEMORY_USAGE } from './constants';

export type MemoryManagerType = {
    requestProcessor: ProcessorType,
    requestQuery: any[]
}

function MemoryManager(config) {
    this.requestProcessor = newProseccor({});
    this.requestQuery = [];
}

MemoryManager.prototype.process = function (request: any) {
    const usage = process.memoryUsage();
    if (usage.rss >= MAX_MEMORY_USAGE * 0.9)
        return this.requestQuery.push(request);
    // TODO else
    this.requestProcessor.process(request);
}

let memoryManagerInstance = null;

export function getMemoryManager() {
    return memoryManagerInstance;
}

export function newMemoryManager(config) {
    return memoryManagerInstance = new MemoryManager(config);
}
