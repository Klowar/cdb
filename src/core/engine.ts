import { DatabaseEntity } from './entity';
import { memoryManager } from './memory';


export function engine() {
    this.memoryManager = new memoryManager();
    this.enitityMap = new Map<number, DatabaseEntity>();
}
