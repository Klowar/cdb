import { sum } from 'lodash';
import { AmmscBase } from '.';
import { Request } from '../../processor';
import { Ammsc, SelectStatement } from './../../parser/types';
import { Union } from './../../union/index';


export type AmmscSum = AmmscBase;
export const AmmscSumName = 'SUM'

export function AmmscSum(this: AmmscSum, ammsc: Ammsc, union: Union) {
    this.ammsc = ammsc;
    this.target = union;
}

AmmscSum.prototype.read = async function (this: AmmscSum, req: Request<SelectStatement>) {
    if (this.ammsc.params.length !== 1)
        throw new Error("Wrong parameter amount");
    return await this.target.getEntity(this.ammsc.params[0].name)
        .read(req)
        .then(val => sum(val[0]) + sum(val[1]));
}
