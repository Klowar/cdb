import { getParser as getCompiledParser } from '../compiler';
import scope from './sqope';
import { Root } from './types';
export * from './types';

export type Parser = {
    parser: {
        parse: Function,
        yy: { [key: string]: any }
    },
    parse: (data: string) => Root;
}

function getParser() {
    const parser = getCompiledParser();
    parser.yy.scope = new scope();
    parser.yy.ast = new parser.yy.scope.ast_root();
    return parser;
}

export function Parser(this: Parser) {
    this.parser = getParser();
}

Parser.prototype.parse = function (this: Parser, event: string) {
    return this.parser.parse.call(this.parser, event);
}
