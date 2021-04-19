import { Root } from './../parser/types';
import { MemoryManager, newMemoryManager } from './../memory/index';


export type Executor = {
    mm: MemoryManager;
    process: (request: Root) => Promise<any>;
}

function Executor(this: Executor, config) {
    this.mm = newMemoryManager({});
}

Executor.prototype.process = function (this: Executor, request: Root) {
    // TODO checks for permissions and other
    return this.mm.process(request);
}

let executorInstance: Executor | null = null;

export function getExecutor(): Executor | null {
    return executorInstance;
}

export function newExecutor(config): Executor {
    return executorInstance = new Executor(config);
}
