import { CREATE_OPTIONS, STATEMENTS, TABLE_MODE } from './constants';
import { AlterStatement, Ammsc, BinaryExpression, CreateStatement, DeleteStatement, DropStatement, Expression, Identifier, InsertStatement, Literal, Root, ScopeType, SelectStatement, Statement, TypedIdentifier, UnaryExpression, UpdateStatement } from './types';
/** ast tree wrapper */

// Some parameter like static strings, numbers in query
function literal(this: Literal, value: string | number) {
    this.value = value;
}

// Column names, table names and other named things
function identifier(this: Identifier, obj?: { name: string, index?: number, alias?: string, scope?: Identifier }) {
    if (obj !== undefined) {
        this.name = obj.name;
        this.alias = obj.alias;
        this.scope = obj.scope;
        this.index = obj.index || 0;
    }
}
identifier.prototype.setName = function (this: Identifier, name: string) {
    this.name = name;
}
identifier.prototype.setAlias = function (this: Identifier, alias: string) {
    this.alias = alias;
}
identifier.prototype.setScope = function (this: Identifier, scope: Identifier) {
    this.scope = scope;
}
identifier.prototype.setIndex = function (this: Identifier, index: number) {
    this.index = index;
}

function typedIdentifier(this: TypedIdentifier, obj?: { name: string, type: string, size?: number, index?: number }) {
    if (obj !== undefined) {
        this.name = obj.name;
        this.type = obj.type;
        this.size = obj.size;
        this.index = obj.index || 0;
    }
}
typedIdentifier.prototype.setName = function (this: TypedIdentifier, name: string) {
    this.name = name;
}
typedIdentifier.prototype.setType = function (this: TypedIdentifier, type: string) {
    this.type = type;
}
typedIdentifier.prototype.setIndex = function (this: TypedIdentifier, index: number) {
    this.index = index;
}

// Root of query
ast_root.prototype = new identifier({ name: 'root', index: -1 });
function ast_root(this: Root) {
    this.objects = [];
    this.statement = null;
}
ast_root.prototype.setStatement = function (this: Root, statement: Statement) {
    this.statement = statement;
}
ast_root.prototype.add = function (this: Root, some: Statement | Identifier | Expression | Literal) {
    this.objects.push(some);
}

// Calculatable values
function expression(this: Expression, obj: { operator: string }) {
    this.operator = obj.operator;
}
expression.prototype.setOperator = function (this: Expression, operator: string) {
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
binaryExpression.prototype.setLParam = function (this: BinaryExpression, lParam: Literal | Identifier | Expression) {
    this.lParam = lParam;
}
binaryExpression.prototype.setRParam = function (this: BinaryExpression, rParam: Literal | Identifier | Expression) {
    this.rParam = rParam;
}
binaryExpression.prototype.setOperator = function (this: BinaryExpression, operator: string) {
    this.operator = operator;
}

function ammsc(this: Ammsc, obj: { name: string, params: any[], alias?: string }) {
    this.name = obj.name;
    this.params = obj.params;
    this.alias = obj.alias || obj.name;
}

const DEFAULT_SCHEMA = 'default';
// Select, insert, update base
function statement(this: Statement, obj: { type: string }) {
    this.type = obj.type;
    this.target = null;
    this.schema = DEFAULT_SCHEMA;
}
statement.prototype = {
    setTarget: function (this: Statement, target: Identifier) {
        this.target = target;
    },
    setSchema: function (this: Statement, schema: string) {
        this.schema = schema;
    },
    setType: function () {
        throw Error("Not allowed to change statement type");
    }
}

// DDL

createStatement.prototype = new statement({ type: STATEMENTS.DDL.CREATE });
function createStatement(this: CreateStatement) {
    this.options = {};
    this.columns = [];
}
createStatement.prototype.setColumns = function (this: CreateStatement, columns: TypedIdentifier[]) {
    this.columns = columns;
}
createStatement.prototype.setOption = function (this: CreateStatement, key: string, option: string) {
    this.options[key] = option;
}

alterStatement.prototype = new statement({ type: STATEMENTS.DDL.ALTER })
function alterStatement(this: AlterStatement) { }

alterStatement.prototype.setExpression = function (this: AlterStatement, expression: BinaryExpression) {
    this.expression = expression;
}

dropStatement.prototype = new statement({ type: STATEMENTS.DDL.DROP })
function dropStatement(this: DropStatement) { }

// DML

selectStatement.prototype = new statement({ type: STATEMENTS.DML.SELECT });
function selectStatement(this: SelectStatement) {
    this.where = null;
    this.columns = [];
}
selectStatement.prototype.setWhere = function (this: SelectStatement, where: BinaryExpression) {
    this.where = where;
}
selectStatement.prototype.addColumn = function (this: SelectStatement, elem: Identifier) {
    this.columns.push(elem);
}
selectStatement.prototype.setColumns = function (this: SelectStatement, columns: Identifier[]) {
    this.columns = columns;
}


insertStatement.prototype = new statement({ type: STATEMENTS.DML.INSERT });
function insertStatement(this: InsertStatement) {
    this.values = [];
    this.columns = [];
}
insertStatement.prototype.addValue = function (this: InsertStatement, value: Literal) {
    this.values.push(value);
}
insertStatement.prototype.setValues = function (this: InsertStatement, values: Literal[]) {
    this.values = values;
}
insertStatement.prototype.addColumn = function (this: InsertStatement, column: Identifier) {
    this.columns.push(column);
}
insertStatement.prototype.setColumns = function (this: InsertStatement, columns: Identifier[]) {
    this.columns = columns;
}



updateStatement.prototype = new statement({ type: STATEMENTS.DML.UPDATE });
function updateStatement(this: UpdateStatement) {
    this.where = null;
}
updateStatement.prototype.setWhere = function (this: UpdateStatement, where: BinaryExpression) {
    this.where = where;
}
updateStatement.prototype.setExpression = function (this: UpdateStatement, expression: BinaryExpression) {
    this.expression = expression;
}


deleteStatement.prototype = new statement({ type: STATEMENTS.DML.DELETE })
function deleteStatement(this: DeleteStatement) {
    this.where = null;
}
deleteStatement.prototype.setWhere = function (this: DeleteStatement, where: BinaryExpression) {
    this.where = where;
}

export default function scope(this: ScopeType) {
}

scope.prototype.const = Object.assign({}, STATEMENTS, TABLE_MODE, CREATE_OPTIONS);
scope.prototype.literal = literal;
scope.prototype.ast_root = ast_root;
scope.prototype.identifier = identifier;
scope.prototype.typedIdentifier = typedIdentifier;
// Expression
scope.prototype.unaryExpression = unaryExpression;
scope.prototype.binaryExpression = binaryExpression;
// Functions
scope.prototype.ammsc = ammsc;
// Statement
scope.prototype.selectStatement = selectStatement;
scope.prototype.insertStatement = insertStatement;
scope.prototype.updateStatement = updateStatement;
scope.prototype.deleteStatement = deleteStatement;
// DDL
scope.prototype.dropStatement = dropStatement;
scope.prototype.alterStatement = alterStatement;
scope.prototype.createStatement = createStatement;
