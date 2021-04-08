import { MemoryManagerType, newMemoryManager } from './../memory/index';


export type ExecutorType = {
    mm: MemoryManagerType
}

function Executor(this: ExecutorType, config) {
    this.mm = newMemoryManager({});
}

Executor.prototype.process = function (request) {
    // TODO checks for permissions and other
    this.mm.process(request);
}

let executorInstance = null;

export function getExecutor() {
    return executorInstance;
}

export function newExecutor(config) {
    return executorInstance = new Executor(config);
}
