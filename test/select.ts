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
        // console.dir(parser.parser.yy.ast.statement);
    });
    
    it("all column select", function all_column_select() {
        parser.parse('SELECT * FROM t1;');
    });

    it("named column select", function named_column_select() {
        parser.parse('SELECT name FROM t2;');
    })

    it("conditional named column select", function conditional_named_column_select() {
        parser.parse('SELECT name FROM t1 WHERE name > 0;');
    });

    it("multiple named column select", function multiple_named_column_select() {
        parser.parse('SELECT a,b,c FROM t1 WHERE a > 0;');
    });

    it("column access thought table name", function column_access_thought_table_name() {
        parser.parse('SELECT t1.foo FROM t1;');
    });
});
