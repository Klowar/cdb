import { newCore } from '../../src/core';



const TABLE = "CREATE TABLE test(a INTEGER, b CHARACTER(20));"
const INSERT = "INSERT INTO test VALUES (100, 'asdasda');"
const SELECT = "SELECT a,b FROM test WHERE a == 100;"

describe("Select performance", function select() {

    let app = newCore({});

    before(async function setup() {
        await app.process(app.parser.parse(TABLE));
        await app.process(app.parser.parse(INSERT));
    });

    it("Single record selection", async function create_table() {
        await app.process(app.parser.parse(SELECT));
    });

});
