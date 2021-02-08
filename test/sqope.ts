/** ast tree wrapper */

// Some parameter like static strings, numbers in query
literal.prototype = Object.create(null);
function literal(value: string | number) {
    this.value = value;
}

// Column names, table names and other named things
identifier.prototype = Object.create(null);
function identifier(obj: { name: string, alias?: string }) {
    this.name = obj.name;
    this.alias = obj.alias;
}
identifier.prototype.setName = function(name) {
    this.name = name;
}
identifier.prototype.setAlias = function(alias) {
    this.alias = alias;
}

// Root of query
ast_root.prototype = Object.create(identifier, {
    name: {
        configurable: false,
        writable: false,
        value: 'root'
    }
});
function ast_root() {
    this.objects = [];
    this.statement = null;
}
ast_root.prototype.setStatement = function(statement) {
    this.statement = statement;
}
ast_root.prototype.add = function(some) {
    this.objects.push(some);
}

// Calculatable values
function expression(obj: { operator: string }) {
    this.operator = obj.operator;
}
expression.prototype.setOperator = function(operator: string) {
    this.operator = operator;
}

// not a ... etc
unaryExpression.prototype = Object.create(expression);
function unaryExpression(obj: { param?: string | number }) {
    this.param = obj.param;
}
unaryExpression.prototype.setParam = function(param) {
    this.param = param;
}

// a > b ... etc
binaryExpression.prototype = Object.create(expression);
function binaryExpression(obj: { lParam: string | number, rParam: string | number }) {
    this.lParam = obj.lParam;
    this.rParam = obj.rParam;
}
binaryExpression.prototype.setLParam = function(lParam: string | number) {
    this.lParam = lParam;
}
binaryExpression.prototype.setRParam = function(rParam: string | number) {
    this.rParam = rParam;
}

const STATEMENTS = {
    DDL: {
        CREATE: 'create',
        ALTER: 'alter',
        DROP: 'drop'
    },
    DML: {
        SELECT: 'select',
        INSERT: 'insert',
        UPDATE: 'update',
        DELETE: 'delete'
    }
};
const DEFAULT_SCHEMA = 'default';
// Select, insert, update base
statement.prototype = Object.create(null);
function statement(obj: { type: string }) {
    this.type = obj.type;
    this.target = null
    this.schema = DEFAULT_SCHEMA;
}
statement.prototype.setTarget = function(target) {
    this.target = target;
}
statement.prototype.setSchema = function(schema) {
    this.schema = schema;
}
statement.prototype.setType = function() {
    throw Error("Not allowed to change statement type");
}

// DDL

createStatement.prototype = Object.create(statement);
function createStatement() {
    this.type = STATEMENTS.DDL.CREATE;
    this.schema = DEFAULT_SCHEMA;
    this.target = null;
}

alterStatement.prototype = Object.create(statement);
function alterStatement() {
    this.type = STATEMENTS.DDL.ALTER;
    this.schema = DEFAULT_SCHEMA;
    this.target = null;
}

dropStatement.prototype = Object.create(statement);
function dropStatement() {
    this.type = STATEMENTS.DDL.DROP;
    this.schema = DEFAULT_SCHEMA;
    this.target = null;
}

// DML

selectStatement.prototype = Object.create(statement);
function selectStatement() {
    this.type = STATEMENTS.DML.SELECT;
    this.where = null;
    this.target = null;
    this.columns = [];
}
selectStatement.prototype.setWhere = function(where) {
    this.where = where;
}
selectStatement.prototype.addColumn = function(elem) {
    this.resultSet.push(elem);
}


insertStatement.prototype = Object.create(statement);
function insertStatement() {
    this.type = STATEMENTS.DML.INSERT;
    this.values = [];
    this.target = null;
    this.columns = [];
}
insertStatement.prototype.addValue = function(value) {
    this.values.push(value);
}
insertStatement.prototype.addColumn = function(column) {
    this.columns.push(column);
}


updateStatement.prototype = Object.create(statement);
function updateStatement() {
    this.type = STATEMENTS.DML.UPDATE;
    this.where = null;
    this.values = [];
    this.columns = [];
}
updateStatement.prototype.setWhere = function(where) {
    this.where = where;
}
updateStatement.prototype.addValue = function(value) {
    this.values.push(value);
}
updateStatement.prototype.addColumn = function(column) {
    this.columns.push(column);
}


deleteStatement.prototype = Object.create(statement);
function deleteStatement() {
    this.type = STATEMENTS.DML.DELETE;
    this.where = null;
    this.columns = [];
}
deleteStatement.prototype.setWhere = function(where) {
    this.where = where;
}
deleteStatement.prototype.addColumn = function(column) {
    this.columns.push(column);
}



export default function scope() {
    this.literal = literal;
    this.ast_root = ast_root;
    this.identifier = identifier;
    // Expressions
    this.unaryExpression = unaryExpression
    this.binaryExpression = binaryExpression;
    // Statements
    this.selectStatement = selectStatement;
    this.insertStatement = insertStatement;
    this.updateStatement = updateStatement;
    this.deleteStatement = deleteStatement;
}