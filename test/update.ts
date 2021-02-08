import parser from '../src/compiler';
import scope from './sqope';


describe("Parser.parse", function select() {

    before(function setup() {
        parser.parser.yy.scope = new scope();
    })

    beforeEach(function setup() {
        parser.parser.yy.ast = new parser.parser.yy.scope.ast_root();
    });

    afterEach(function cleanup() {
        console.dir(parser.parser.yy.ast);
    });

    it("update table column", function update_table_column() {
        parser.parse('UPDATE t1 SET a = 10;');
    });

    it("update table column with where", function update_table_column_with_where() {
        parser.parse('UPDATE t1 SET a = 10 WHERE id == 1;');
    });

});
