import { Parser } from '../src/parser';


describe("Parser.parse", function select() {

    let parser = new Parser();

    beforeEach(function setup() {
        parser = new Parser();
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
