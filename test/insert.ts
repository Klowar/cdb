import * as parser from '../src/compiler/sql';
import * as scope from './sqope';

parser.parser.yy.scope = scope;

describe("Parser.parse", function select() {

    it("all integers insert", function all_integers_insert() {
        parser.parse('INSERT INTO t1(a,b,c,d) VALUES(1,2,3,4);', scope);
    });

    it("integer and string insert", function integer_string_insert() {
        parser.parse('INSERT INTO t1(a,b,d) VALUES(1, \'boss\', 12);', scope);
    })

    it("without column specifying insert", function uncolumned_insert() {
        parser.parse('INSERT INTO t1 VALUES(1, \'boss\', 12);', scope);
    });

});
