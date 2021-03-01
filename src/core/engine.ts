import { entityManager } from '../entity/manager';
import { memoryManager } from './memory';


export function engine() {
    this.memoryManager = new memoryManager();
    this.entityManager = new entityManager();
}
