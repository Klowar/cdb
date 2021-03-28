import { MemoryManagerType } from './../memory/index';


export type ExecutorType = {
    mm: MemoryManagerType
}

function Executor(config) {
    this.mm = config.memoryManager;
}

Executor.prototype.process = function (request) {
    console.log("Executor checks for premission, other", request);
}


export function getExecutor(config) {
    return new Executor(config);
}
