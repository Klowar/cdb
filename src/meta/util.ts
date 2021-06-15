import { MetaFile } from ".";
import { TABLE_MODE } from './../parser/constants';
import { CharReader } from './reader/char_reader';
import { IntReader } from './reader/int_reader';
import { VarCharReader } from "./reader/varchar_reader";
import { LinkedUpdater } from './updater/linked';
import { UniqueUpdater } from './updater/unique';
import { CharWriter } from './writer/char_writer';
import { IntWriter } from './writer/int_writer';
import { VarCharWriter } from "./writer/varchar_writer";



export function getReader(type: string, mf: MetaFile) {
    switch (type) {
        case 'CHARACTER':
            return new CharReader(mf, mf.vf);
        case 'INTEGER':
            return new IntReader(mf, mf.vf);
        case 'VARCHAR':
            return new VarCharReader(mf, mf.vf);
        default:
            throw new Error("Unknown type " + type);
    }
}

export function getWriter(type: string, mf: MetaFile) {
    switch (type) {
        case 'CHARACTER':
            return new CharWriter(mf, mf.vf);
        case 'INTEGER':
            return new IntWriter(mf, mf.vf);
        case 'VARCHAR':
            return new VarCharWriter(mf, mf.vf);
        default:
            throw new Error("Unknown type " + type);
    }
}

export function getUpdater(mode: string, mf: MetaFile) {
    switch (mode) {
        case TABLE_MODE.UNIQUE:
            return new UniqueUpdater(mf, mf.vf);
        case TABLE_MODE.LINKED:
            return new LinkedUpdater(mf, mf.vf);
        default:
            throw new Error("Unknown mode " + mode);
    }
}
