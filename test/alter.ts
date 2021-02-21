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

    it("alter table column name", function create_table() {
        parser.parse('ALTER TABLE asd RENAME a to b;');
    });

});
