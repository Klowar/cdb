import { MAX_MEMORY_USAGE } from './constants';



function MemoryManager(config: {}) {
    this.requestQuery = [];
}

MemoryManager.prototype.process = function(request: any) {
    const usage = process.memoryUsage();
    if (usage.rss >= MAX_MEMORY_USAGE * 0.9)
        return this.requestQuery.push(request);
    // TODO else
}

export function getMemoryManager(config) {
    return new MemoryManager(config);
}
