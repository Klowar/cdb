import { Updater } from '.';
import { VirtualFile } from '../../data/index';
import { MetaFile } from '../index';



export type UniqueUpdater = Updater<any>;

export function UniqueUpdater(this: UniqueUpdater, mf: MetaFile, vf: VirtualFile) {
    this.mf = mf;
    this.vf = vf;
}

UniqueUpdater.prototype.update = async function (this: UniqueUpdater, records: number[], data: any) {
    let offset = await this.mf.getOffset(data);
    if (offset == -1) {
        offset = this.mf.offset;
        await this.mf.write(data);
    }
    return Promise.all(records.map(_ => this.vf.writeRecord(offset, data, _).then(() => _)));
}