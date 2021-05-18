import { STATEMENTS } from './constants';
import { AlterStatement, AlterStatementConstructor, BinaryExpression, BinaryExpressionConstructor, CreateStatement, CreateStatementConstructor, DeleteStatement, DeleteStatementConstructor, DropStatement, DropStatementConstructor, Expression, Identifier, IdentifierConstructor, InsertStatement, InsertStatementConstructor, Literal, LiteralConstructor, Root, RootConstructor, ScopeType, SelectStatement, SelectStatementConstructor, Statement, TypedIdentifier, TypedIdentifierConstructor, UnaryExpression, UnaryExpressionConstructor, UpdateStatement, UpdateStatementConstructor } from './types';
/** ast tree wrapper */

// Some parameter like static strings, numbers in query
literal.prototype = Object.create(null);
function literal(this: Literal, value: string | number) {
    this.value = value;
}

// Column names, table names and other named things
identifier.prototype = Object.create(null);
function identifier(this: Identifier, obj?: { name: string, index?: number, alias?: string, scope?: Identifier }) {
    if (obj !== undefined) {
        this.name = obj.name;
        this.alias = obj.alias;
        this.scope = obj.scope;
        this.index = obj.index || 0;
    }
}
identifier.prototype.setName = function (name) {
    this.name = name;
}
identifier.prototype.setAlias = function (alias) {
    this.alias = alias;
}
identifier.prototype.setScope = function (scope) {
    this.scope = scope;
}
identifier.prototype.setIndex = function (index) {
    this.index = index;
}

typedIdentifier.prototype = Object.create(null);
function typedIdentifier(this: TypedIdentifier, obj?: { name: string, type: string, size?: number, index?: number }) {
    if (obj !== undefined) {
        this.name = obj.name;
        this.type = obj.type;
        this.size = obj.size;
        this.index = obj.index || 0;
    }
}
typedIdentifier.prototype.setName = function (name) {
    this.name = name;
}
typedIdentifier.prototype.setType = function (type) {
    this.type = type;
}
typedIdentifier.prototype.setIndex = function (index) {
    this.index = index;
}

// Root of query
ast_root.prototype = new identifier({ name: 'root', index: -1 });
function ast_root(this: Root) {
    this.objects = [];
    this.statement = null;
}
ast_root.prototype.setStatement = function (statement) {
    this.statement = statement;
}
ast_root.prototype.add = function (some) {
    this.objects.push(some);
}

// Calculatable values
function expression(this: Expression, obj: { operator: string }) {
    this.operator = obj.operator;
}
expression.prototype.setOperator = function (operator: string) {
    this.operator = operator;
}

// not a ... etc
unaryExpression.prototype = Object.create(expression);
function unaryExpression(this: UnaryExpression, obj: { param: Identifier | Literal | Expression, operator: string }) {
    this.operator = obj.operator;
    this.param = obj.param;
}
unaryExpression.prototype.setParam = function (param) {
    this.param = param;
}

// a > b ... etc
binaryExpression.prototype = Object.create(expression);
function binaryExpression(this: BinaryExpression, obj: { lParam: Identifier | Literal | Expression, rParam: Identifier | Literal | Expression, operator: string }) {
    this.lParam = obj.lParam;
    this.rParam = obj.rParam;
    this.operator = obj.operator;
}
binaryExpression.prototype.setLParam = function (lParam: typeof literal | typeof identifier) {
    this.lParam = lParam;
}
binaryExpression.prototype.setRParam = function (rParam: typeof literal | typeof identifier) {
    this.rParam = rParam;
}
binaryExpression.prototype.setOperator = function (operator: string) {
    this.operator = operator;
}

const DEFAULT_SCHEMA = 'default';
// Select, insert, update base
function statement(this: Statement, obj: { type: string }) {
    this.type = obj.type;
    this.target = null;
    this.schema = DEFAULT_SCHEMA;
}
statement.prototype = {
    setTarget: function (target) {
        this.target = target;
    },
    setSchema: function (schema) {
        this.schema = schema;
    },
    setType: function () {
        throw Error("Not allowed to change statement type");
    }
}

// DDL

createStatement.prototype = new statement({ type: STATEMENTS.DDL.CREATE });
function createStatement(this: CreateStatement) {
    this.columns = [];
}
createStatement.prototype.setColumns = function (columns) {
    this.columns = columns;
}

alterStatement.prototype = new statement({ type: STATEMENTS.DDL.ALTER })
function alterStatement(this: AlterStatement) {
    this.expressions = [];
}
alterStatement.prototype.setExpressions = function (expressions) {
    this.expressions = expressions;
}

dropStatement.prototype = new statement({ type: STATEMENTS.DDL.DROP })
function dropStatement(this: DropStatement) { }

// DML

selectStatement.prototype = new statement({ type: STATEMENTS.DML.SELECT });
function selectStatement(this: SelectStatement) {
    this.where = null;
    this.columns = [];
}
selectStatement.prototype.setWhere = function (where) {
    this.where = where;
}
selectStatement.prototype.addColumn = function (elem) {
    this.columns.push(elem);
}
selectStatement.prototype.setColumns = function (columns) {
    this.columns = columns;
}


insertStatement.prototype = new statement({ type: STATEMENTS.DML.INSERT });
function insertStatement(this: InsertStatement) {
    this.values = [];
    this.columns = [];
}
insertStatement.prototype.addValue = function (value) {
    this.values.push(value);
}
insertStatement.prototype.setValues = function (values) {
    this.values = values;
}
insertStatement.prototype.addColumn = function (column) {
    this.columns.push(column);
}
insertStatement.prototype.setColumns = function (columns) {
    this.columns = columns;
}



updateStatement.prototype = new statement({ type: STATEMENTS.DML.UPDATE });
function updateStatement(this: UpdateStatement) {
    this.where = null;
    this.expressions = []
}
updateStatement.prototype.setWhere = function (where) {
    this.where = where;
}
updateStatement.prototype.setExpressions = function (expressions) {
    this.expressions = expressions;
}


deleteStatement.prototype = new statement({ type: STATEMENTS.DML.DELETE })
function deleteStatement(this: DeleteStatement) {
    this.where = null;
}
deleteStatement.prototype.setWhere = function (where) {
    this.where = where;
}

export default function scope(this: ScopeType) {
}

scope.prototype.literal = literal;
scope.prototype.ast_root = ast_root;
scope.prototype.identifier = identifier;
scope.prototype.typedIdentifier = typedIdentifier;
// Expression
scope.prototype.unaryExpression = unaryExpression;
scope.prototype.binaryExpression = binaryExpression;
// Statement
scope.prototype.selectStatement = selectStatement;
scope.prototype.insertStatement = insertStatement;
scope.prototype.updateStatement = updateStatement;
scope.prototype.deleteStatement = deleteStatement;
// DDL
scope.prototype.dropStatement = dropStatement;
scope.prototype.alterStatement = alterStatement;
scope.prototype.createStatement = createStatement;
