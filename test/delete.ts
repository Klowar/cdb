import * as parser from '../src/compiler/sql';
import * as scope from './sqope';

parser.parser.yy.scope = scope;

describe("Parser.parse", function select() {

    it("all table delete", function all_column_select() {
        parser.parse('DELETE FROM t1;', scope);
    });

    it("conditional table delete", function conditional_named_column_select() {
        parser.parse('DELETE FROM t1 WHERE name > 0;', scope);
    });

});
