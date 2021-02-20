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
        console.dir(parser.parser.yy.ast.statement);
    });

    it("all integers insert", function all_integers_insert() {
        parser.parse('INSERT INTO t1(a,b,c,d) VALUES(1,2,3,4);');
    });

    it("integer and string insert", function integer_string_insert() {
        parser.parse('INSERT INTO t1(a,b,d) VALUES(1, \'boss\', 12);');
    })

    it("without column specifying insert", function uncolumned_insert() {
        parser.parse('INSERT INTO t1 VALUES(1, \'boss\', 12);');
    });

});
