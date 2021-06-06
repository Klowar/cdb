import scope from '../parser/sqope';
import { Literal, ScopeType } from './../parser/types';


const scopeInstance: ScopeType = new scope();
export function castTo(type: string, value: Literal): Literal {
    switch (type) {
        case 'VARCHAR':
        case 'CHARACTER':
            return new scopeInstance.literal(String(value.value));
        case 'INTEGER':
            return new scopeInstance.literal(Number(value.value));
        default:
            throw new Error("Unknown type " + type);
    }
}