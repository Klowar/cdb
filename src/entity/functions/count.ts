import { AmmscBase } from '.';
import { Request } from '../../processor';
import { Ammsc, SelectStatement } from './../../parser/types';
import { Union } from './../../union/index';


export type AmmscCount = AmmscBase;
export const AmmscCountName = 'COUNT'

export function AmmscCount(this: AmmscCount, ammsc: Ammsc, union: Union) {
    this.ammsc = ammsc;
    this.target = union;
}

AmmscCount.prototype.read = async function (this: AmmscCount, req: Request<SelectStatement>) {
    if (this.ammsc.params.length !== 1)
        throw new Error("Wrong parameter amount");
    return await this.target.getEntity(this.ammsc.params[0].name)
        .read(req)
        .then(val => val[0].length + val[1].length);
}
