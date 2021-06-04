import { sum } from 'lodash';
import { AmmscBase } from '.';
import { Request } from '../../processor';
import { Ammsc, SelectStatement } from './../../parser/types';
import { Union } from './../../union/index';


export type AmmscAvg = AmmscBase;
export const AmmscAvgName = 'AVG';

export function AmmscAvg(this: AmmscAvg, ammsc: Ammsc, union: Union) {
    this.ammsc = ammsc;
    this.target = union;
}

AmmscAvg.prototype.read = async function (this: AmmscAvg, req: Request<SelectStatement>) {
    if (this.ammsc.params.length !== 1)
        throw new Error("Wrong parameter amount");
    return await this.target.getEntity(this.ammsc.params[0].name)
        .read(req)
        .then(val => val[0].length + val[1].length > 0 ? val : [[0], [0]])
        .then(val => (sum(val[0]) + sum(val[1])) / (val[0].length + val[1].length));
}
