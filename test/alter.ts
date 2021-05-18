import { Parser } from '../src/parser';


describe("Parser.parse", function select() {

    let parser = new Parser();

    beforeEach(function setup() {
        parser = new Parser();
    });

    afterEach(function cleanup() {
        console.dir(parser.parser.yy.ast);
    });

    it("alter table column name", function create_table() {
        parser.parse('ALTER TABLE asd RENAME a to b;');
    });

});
