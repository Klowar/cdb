import { Parser } from '../../src/parser';


describe("Parser.parse", function select() {

    let parser = new Parser();

    beforeEach(function setup() {
        parser = new Parser();
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
        parser.parse('CREATE TABLE asd(name CHARACTER(20));');
    });

    it("create scheme", function conditional_table_delete() {
        parser.parse('CREATE SCHEMA user;');
    });

});
