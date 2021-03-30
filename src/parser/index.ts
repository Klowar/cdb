import parser from '../compiler';
import scope from './sqope';
export * from './types';

export type ParserType = {
    parser: {
        parse: Function,
        parser: {
            yy: { [key: string]: any }
        }
    }
}

export function getParser() {
    parser.parser.yy.scope = new scope();
    parser.parser.yy.ast = new parser.parser.yy.scope.ast_root();
    return parser;
}

export function Parser() {
    this.parser = getParser();
}
