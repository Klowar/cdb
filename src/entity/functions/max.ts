import { max } from 'lodash';
import { AmmscBase } from '.';
import { Ammsc } from './../../parser/types';
import { Union } from './../../union/index';


export type AmmscMax = AmmscBase;
export const AmmscMaxName = 'MAX'

export function AmmscMax(this: AmmscMax, ammsc: Ammsc, union: Union) {
    AmmscBase.call(this, ammsc, union);
}

AmmscMax.prototype.getIndex = function (this: AmmscMax) {
    return this.target.getEntity(this.ammsc.params[0].name);
}

AmmscMax.prototype.read = async function (this: AmmscMax, records: number[] | undefined) {
    if (this.ammsc.params.length !== 1)
        throw new Error("Wrong parameter amount");
    return await this.target.getEntity(this.ammsc.params[0].name)
        .read(records)
        .then(val => val[0].concat(val[1]))
        .then(val => max(val));
}
