import { EventEmitter } from "events";
import { memoryUsage } from "process";

// 4 Gb
const MAX_MEMORY_USAGE = 4096 * 1024 * 1024;

memoryManager.prototype = new EventEmitter();
export function memoryManager() {
    this.interval = setInterval(function checkMemory() {
        const memUsed = memoryUsage();
        if (memUsed.rss > MAX_MEMORY_USAGE)
            this.emit('memoryMax');
    }, 1000, this);
}
