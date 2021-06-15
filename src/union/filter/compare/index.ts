

export type Comparator<T> = {
    value: T;
    operator: string;
    compare: (candidat: T) => boolean;
}

export function Comparator(this: Comparator<any>, value: any, operator: string) {
    this.value = value;
    this.operator = operator;
}

Comparator.prototype.compare = function (this: Comparator<any>, candidat: any) {
    throw new Error('Unrealized comparator');
}
