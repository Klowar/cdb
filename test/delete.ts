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

    it("all table delete", function all_column_delete() {
        parser.parse('DELETE FROM t1;');
    });

    it("conditional table delete", function conditional_table_delete() {
        parser.parse('DELETE FROM t1 WHERE name > 0;');
    });

});
