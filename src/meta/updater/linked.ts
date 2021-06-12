import { Updater } from '.';
import { VirtualFile } from '../../data/index';
import { MetaFile } from '../index';
import { UniqueUpdater } from './unique';



export type LinkedUpdater = Updater<any>;

export function LinkedUpdater(this: LinkedUpdater, mf: MetaFile, vf: VirtualFile) {
    this.mf = mf;
    this.vf = vf;
}

LinkedUpdater.prototype.update = async function (this: LinkedUpdater, records: number[], data: any) {
    let [offset, length] = await this.vf.readRecord(records[0]);

    if (records.length > 1 || typeof data === 'string' && data.length > length)
        return UniqueUpdater.prototype.update.call(this, records, data);

    return this.vf.write(offset, data);
}
