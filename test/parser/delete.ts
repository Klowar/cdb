import { Parser } from '../../src/parser';


describe("Parser.parse", function select() {

    let parser = new Parser();

    beforeEach(function setup() {
        parser = new Parser();
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
