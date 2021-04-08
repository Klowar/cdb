import { getParser as getCompiledParser } from '../compiler';
import scope from './sqope';
export * from './types';

export type ParserType = {
    parser: {
        parse: Function,
        yy: { [key: string]: any }
    }
}

function getParser() {
    const parser = getCompiledParser();
    parser.yy.scope = new scope();
    parser.yy.ast = new parser.yy.scope.ast_root();
    return parser;
}

export function Parser(this: ParserType) {
    this.parser = getParser();
}

Parser.prototype.parse = function () {
    return this.parser.parse.apply(this.parser, arguments);
}
