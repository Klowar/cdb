import * as parser from '../src/compiler/sql';
import * as scope from './sqope';


describe("Parser.parse", function select() {

    beforeEach(function setup() {
        parser.parser.yy.ast = new scope.ast();
    });

    afterEach(function cleanup() {
        parser.parser.yy = {};
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
