/** ast tree wrapper */

// Some parameter like static strings, numbers in query
literal.prototype = Object.create(null);
function literal(value: string | number) {
    this.value = value;
}

// Column names, table names and other named things
identifier.prototype = Object.create(null);
function identifier(obj?: { name: string, alias?: string, scope?: typeof identifier }) {
    this.name = obj.name;
    this.alias = obj.alias;
    this.scope = obj.scope;
}
identifier.prototype.setName = function(name) {
    this.name = name;
}
identifier.prototype.setAlias = function(alias) {
    this.alias = alias;
}
identifier.prototype.setScope = function(scope) {
    this.scope = scope;
}

typedIdentifier.prototype = Object.create(null);
function typedIdentifier(obj?: { name: string, type: string }) {
    this.name = obj.name;
    this.type = obj.type;
}
typedIdentifier.prototype.setName = function(name) {
    this.name = name;
}
typedIdentifier.prototype.setType = function(type) {
    this.type = type;
}

// Root of query
ast_root.prototype = new identifier({ name: 'root' });
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
function binaryExpression(obj: { lParam: typeof literal | typeof identifier, rParam: typeof literal | typeof identifier, operator: string }) {
    this.lParam = obj.lParam;
    this.rParam = obj.rParam;
    this.operator = obj.operator;
}
binaryExpression.prototype.setLParam = function(lParam: typeof literal | typeof identifier) {
    this.lParam = lParam;
}
binaryExpression.prototype.setRParam = function(rParam: typeof literal | typeof identifier) {
    this.rParam = rParam;
}
binaryExpression.prototype.setOperator = function(operator: string) {
    this.operator = operator;
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
function statement(obj: { type: string }) {
    this.type = obj.type;
    this.target = null
    this.schema = DEFAULT_SCHEMA;
}
statement.prototype = {
    setTarget: function(target) {
        this.target = target;
    },
    setSchema: function(schema) {
        this.schema = schema;
    },
    setType: function() {
        throw Error("Not allowed to change statement type");
    }
}

// DDL

createStatement.prototype = new statement({ type: STATEMENTS.DDL.CREATE });
function createStatement() {
    this.columns = [];
}
createStatement.prototype.setColumns = function(columns) {
    this.columns = columns;
}

alterStatement.prototype = new statement({ type: STATEMENTS.DDL.ALTER })
function alterStatement() {
    this.expressions = [];
}
alterStatement.prototype.setExpressions = function(expressions) {
    this.expressions = expressions;
}

dropStatement.prototype = new statement({ type: STATEMENTS.DDL.DROP })
function dropStatement() {}

// DML

selectStatement.prototype = new statement({ type: STATEMENTS.DML.SELECT });
function selectStatement() {
    this.where = null;
    this.columns = [];
}
selectStatement.prototype.setWhere = function(where) {
    this.where = where;
}
selectStatement.prototype.addColumn = function(elem) {
    this.columns.push(elem);
}
selectStatement.prototype.setColumns = function(columns) {
    this.columns = columns;
}


insertStatement.prototype = new statement({ type: STATEMENTS.DML.INSERT });
function insertStatement() {
    this.values = [];
    this.columns = [];
}
insertStatement.prototype.addValue = function(value) {
    this.values.push(value);
}
insertStatement.prototype.setValues = function(values) {
    this.values = values;
}
insertStatement.prototype.addColumn = function(column) {
    this.columns.push(column);
}
insertStatement.prototype.setColumns = function(columns) {
    this.columns = columns;
}



updateStatement.prototype = new statement({ type: STATEMENTS.DML.UPDATE });
function updateStatement() {
    this.where = null;
    this.expressions = []
}
updateStatement.prototype.setWhere = function(where) {
    this.where = where;
}
updateStatement.prototype.setExpressions = function(expressions) {
    this.expressions = expressions;
}


deleteStatement.prototype = new statement({ type: STATEMENTS.DML.DELETE })
function deleteStatement() {
    this.where = null;
}
deleteStatement.prototype.setWhere = function(where) {
    this.where = where;
}



export default function scope() {
    this.literal = literal;
    this.ast_root = ast_root;
    this.identifier = identifier;
    this.typedIdentifier = typedIdentifier;
    // Expressions
    this.unaryExpression = unaryExpression
    this.binaryExpression = binaryExpression;
    // Statements
    this.selectStatement = selectStatement;
    this.insertStatement = insertStatement;
    this.updateStatement = updateStatement;
    this.deleteStatement = deleteStatement;
    // DDL Statements
    this.dropStatement = dropStatement;
    this.alterStatement = alterStatement;
    this.createStatement = createStatement;
}
