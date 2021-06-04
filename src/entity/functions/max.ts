import { max } from 'lodash';
import { AmmscBase } from '.';
import { Request } from '../../processor';
import { Ammsc, SelectStatement } from './../../parser/types';
import { Union } from './../../union/index';


export type AmmscMax = AmmscBase;
export const AmmscMaxName = 'MAX'

export function AmmscMax(this: AmmscMax, ammsc: Ammsc, union: Union) {
    this.ammsc = ammsc;
    this.target = union;
}

AmmscMax.prototype.read = async function (this: AmmscMax, req: Request<SelectStatement>) {
    if (this.ammsc.params.length !== 1)
        throw new Error("Wrong parameter amount");
    return await this.target.getEntity(this.ammsc.params[0].name)
        .read(req)
        .then(val => [max(val[0]), max(val[1])])
        .then(val => max(val));
}
