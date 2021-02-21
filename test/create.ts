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

    it("create table integer", function create_table() {
        parser.parse('CREATE TABLE asd(name INTEGER);');
    });

    it("create table decimal", function create_table() {
        parser.parse('CREATE TABLE asd(name DECIMAL);');
    });

    it("create table character", function create_table() {
        parser.parse('CREATE TABLE asd(name CHARACTER);');
    });

    it("create scheme", function conditional_table_delete() {
        parser.parse('CREATE SCHEMA user;');
    });

});
