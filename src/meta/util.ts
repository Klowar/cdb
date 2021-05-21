import { MetaFile } from ".";
import { CharReader } from './reader/char_reader';
import { IntReader } from './reader/int_reader';
import { CharWriter } from './writer/char_writer';
import { IntWriter } from './writer/int_writer';




export function buildType(type: string, data: Buffer): number | string | Date {

    switch (type) {
        case 'CHARACTER':
            return data.toString('utf-8')
        case 'INTEGER':
            return data.readInt32BE(0);
        default:
            throw new Error("Unknown type " + type)
    }
}

export function getReader(type: string, mf: MetaFile) {
    switch (type) {
        case 'CHARACTER':
            return new CharReader(mf, mf.vf);
        case 'INTEGER':
            return new IntReader(mf, mf.vf)
        default:
            throw new Error("Unknown type " + type)
    }
}

export function getWriter(type: string, mf: MetaFile) {
    switch (type) {
        case 'CHARACTER':
            return new CharWriter(mf, mf.vf);
        case 'INTEGER':
            return new IntWriter(mf, mf.vf)
        default:
            throw new Error("Unknown type " + type)
    }
}
