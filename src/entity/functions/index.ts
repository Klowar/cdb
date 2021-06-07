import { Ammsc } from './../../parser/types';
import { Union } from './../../union/index';
import { AmmscAvg, AmmscAvgName } from './avg';
import { AmmscCount, AmmscCountName } from './count';
import { AmmscMax, AmmscMaxName } from './max';
import { AmmscMin, AmmscMinName } from './min';
import { AmmscSum, AmmscSumName } from './sum';


export type AmmscBase = {
    ammsc: Ammsc;
    target: Union;
    read: (records: number[]) => Promise<any>;
    getIndex: () => number;
};

export function AmmscBase(this: AmmscBase, ammsc: Ammsc, union: Union) {
    this.ammsc = ammsc;
    this.target = union;
}

AmmscBase.prototype.getIndex = function (this: AmmscBase) {
    return this.target.getEntity(this.ammsc.params[0].name);
}

AmmscBase.prototype.read = async function (this: AmmscBase, records: number[]) {
    throw new Error("Unrealized ammsc");
}

export const AmmscStore = {
    get: function (ammsc: Ammsc, union: Union) {
        switch (ammsc.name) {
            case AmmscCountName:
                return new AmmscCount(ammsc, union);
            case AmmscAvgName:
                return new AmmscAvg(ammsc, union);
            case AmmscMinName:
                return new AmmscMin(ammsc, union);
            case AmmscMaxName:
                return new AmmscMax(ammsc, union);
            case AmmscSumName:
                return new AmmscSum(ammsc, union);
            default:
                throw new Error("Unknown ammsc");
        }
    }
}
