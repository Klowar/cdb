import * as parser from '../src/compiler/sql';
import * as scope from './sqope';


describe("Parser.parse", function select() {

    beforeEach(function setup() {
        parser.parser.yy.ast = new scope.ast();
    });

    afterEach(function cleanup() {
        parser.parser.yy = {};
    });

    it("all table delete", function all_column_delete() {
        parser.parse('DELETE FROM t1;');
    });

    it("conditional table delete", function conditional_table_delete() {
        parser.parse('DELETE FROM t1 WHERE name > 0;');
    });

});
