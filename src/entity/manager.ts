import { DBEntity } from './entity';


export function entityManager() {
    this.enitities = new Map<string, DBEntity>();
}

entityManager.prototype = {
    get: function(id: string): DBEntity {
        return this.enitities.get(id);
    },
    set: function(id: string, dbe: DBEntity) {
        this.entities.set(id, dbe);
    }
}
