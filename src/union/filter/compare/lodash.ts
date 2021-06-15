import { eq, gt, gte, lt, lte } from 'lodash';
import { Comparator } from './index';


export type LodashComparator = Comparator<any>;

export function LodashComparator(this: LodashComparator, value: any, operator: string) {
    this.value = value;
    this.operator = operator;
}

LodashComparator.prototype.compare = function (this: LodashComparator, candidat: any) {
    switch (this.operator) {
        case '>':
            return gt(candidat, this.value);
        case '>=':
            return gte(candidat, this.value);
        case '<':
            return lt(candidat, this.value);
        case '<=':
            return lte(candidat, this.value);
        case '==':
            return eq(candidat, this.value);
        case '!=':
            return !eq(candidat, this.value);
    }
}
