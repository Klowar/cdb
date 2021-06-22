import { AmmscBase } from '.';
import { Ammsc } from './../../parser/types';
import { Union } from './../../union/index';


export type AmmscCount = AmmscBase;
export const AmmscCountName = 'COUNT'

export function AmmscCount(this: AmmscCount, ammsc: Ammsc, union: Union) {
    AmmscBase.call(this, ammsc, union);
}

AmmscCount.prototype.getIndex = function (this: AmmscCount) {
    return this.target.getEntity(this.ammsc.params[0].name);
}

AmmscCount.prototype.read = async function (this: AmmscCount, records: number[]) {
    if (this.ammsc.params.length !== 1)
        throw new Error("Wrong parameter amount");
    return new Promise((res) => res(records.length))
}
