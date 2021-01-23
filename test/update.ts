import * as parser from '../src/compiler/sql';
import * as scope from './sqope';

parser.parser.yy.scope = scope;

describe("Parser.parse", function select() {

    it("update table column", function update_table_column() {
        parser.parse('UPDATE t1 SET a = 10;', scope);
    });

    it("update table column with where", function update_table_column_with_where() {
        parser.parse('UPDATE t1 SET a = 10 WHERE id == 1;', scope);
    });

});
