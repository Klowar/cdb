import { sum } from 'lodash';
import { AmmscBase } from '.';
import { Ammsc } from './../../parser/types';
import { Union } from './../../union/index';


export type AmmscSum = AmmscBase;
export const AmmscSumName = 'SUM'

export function AmmscSum(this: AmmscSum, ammsc: Ammsc, union: Union) {
    this.ammsc = ammsc;
    this.target = union;
}

AmmscSum.prototype.read = async function (this: AmmscSum, records: number[]) {
    if (this.ammsc.params.length !== 1)
        throw new Error("Wrong parameter amount");
    return await this.target.getEntity(this.ammsc.params[0].name)
        .read(records)
        .then(val => val[0].concat(val[1]))
        .then(val => sum(val));
}
