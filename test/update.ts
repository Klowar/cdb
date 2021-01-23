import * as parser from '../src/compiler/sql';
import * as scope from './sqope';


describe("Parser.parse", function select() {

    beforeEach(function setup() {
        parser.parser.yy.ast = new scope.ast();
    });

    afterEach(function cleanup() {
        parser.parser.yy = {};
    });

    it("update table column", function update_table_column() {
        parser.parse('UPDATE t1 SET a = 10;');
    });

    it("update table column with where", function update_table_column_with_where() {
        parser.parse('UPDATE t1 SET a = 10 WHERE id == 1;');
    });

});
