import { Root } from './../parser/types';
import { newProseccor, Processor } from './../processor/index';
import { MAX_MEMORY_USAGE } from './constants';

export type MemoryManager = {
    requestProcessor: Processor;
    requestQuery: any[];
    process: (request: Root) => any;
}

function MemoryManager(this: MemoryManager, config) {
    this.requestProcessor = newProseccor({});
    this.requestQuery = [];
}

MemoryManager.prototype.process = function (this: MemoryManager, request: Root) {
    const usage = process.memoryUsage();
    if (usage.rss >= MAX_MEMORY_USAGE * 0.9)
        return this.requestQuery.push(request);
    // TODO else
    return this.requestProcessor.process(request);
}

let memoryManagerInstance: MemoryManager | null = null;

export function getMemoryManager(): MemoryManager | null {
    return memoryManagerInstance;
}

export function newMemoryManager(config): MemoryManager {
    return memoryManagerInstance = new MemoryManager(config);
}
