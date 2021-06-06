import { min } from 'lodash';
import { AmmscBase } from '.';
import { Ammsc } from './../../parser/types';
import { Union } from './../../union/index';


export type AmmscMin = AmmscBase;
export const AmmscMinName = 'MIN'

export function AmmscMin(this: AmmscMin, ammsc: Ammsc, union: Union) {
    this.ammsc = ammsc;
    this.target = union;
}

AmmscMin.prototype.read = async function (this: AmmscMin, records: number[]) {
    if (this.ammsc.params.length !== 1)
        throw new Error("Wrong parameter amount");
    return await this.target.getEntity(this.ammsc.params[0].name)
        .read(records)
        .then(val => [min(val[0]), min(val[1])])
        .then(val => min(val));
}
