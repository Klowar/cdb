import * as parser from '../src/compiler/sql';
import * as scope from './sqope';

parser.parser.yy.scope = scope;

describe("Parser.parse", function select() {

    it("all column select", function all_column_select() {
        parser.parse('SELECT * FROM t1;', scope);
    })

    it("named column select", function named_column_select() {
        parser.parse('SELECT name FROM t2;', scope);
    })

    it("conditional named column select", function conditional_named_column_select() {
        parser.parse('SELECT name FROM t1 WHERE name > 0;', scope);
    });

    // This ones fails

    it("multiple named column select", function multiple_named_column_select() {
        parser.parse('SELECT a,b,c FROM t1 WHERE a > 0;', scope);
    });

    it("column access thought table name", function column_access_thought_table_name() {
        parser.parse('SELECT t1.foo FROM t1;', scope);
    });
})
