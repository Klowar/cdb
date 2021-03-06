export type KeyValue = { [key: string]: KeyValue | string }
export type Option = KeyValue;

export type Literal = {
    value: string | number;
}

export type Identifier = {
    name: string;
    index: number;
    alias: string | undefined;
    scope: Identifier | undefined;
}

export type TypedIdentifier = {
    name: string;
    type: string;
    size: number | undefined;
    index: number;
}

export type Expression = {
    operator: string;
}

export type UnaryExpression = Expression & {
    param: Identifier | Literal | Expression;
}

export type BinaryExpression = Expression & {
    lParam: Identifier | Literal | Expression;
    rParam: Identifier | Literal | Expression;
}

export type Ammsc = {
    name: string;
    params: Identifier[];
    alias?: string;
}

export type Statement = {
    type: string;
    schema: string;
    target: Identifier | null;
}

export type CreateStatement = Statement & {
    options: Option;
    columns: TypedIdentifier[];
}

export type AlterStatement = Statement & {
    expression: BinaryExpression;
}

export type DropStatement = Statement;

export type SelectStatement = Statement & {
    where: BinaryExpression | null;
    columns: (Identifier | Ammsc)[];
}

export type InsertStatement = Statement & {
    values: Literal[];
    columns: Identifier[];
}

export type UpdateStatement = Statement & {
    where: BinaryExpression | null;
    expression: BinaryExpression;
}

export type DeleteStatement = Statement & {
    where: BinaryExpression | null;
}

export type Root = {
    objects: any[];
    statement: Statement | null;
}

export interface LiteralConstructor {
    new(value: string | number): Literal;
}

export interface RootConstructor {
    new(): Root;
}

export interface IdentifierConstructor {
    new(obj?: { name: string, alias?: string, scope?: Identifier }): Identifier;
}

export interface TypedIdentifierConstructor {
    new(obj?: { name: string, type: string }): TypedIdentifier;
}

export interface UnaryExpressionConstructor {
    new(obj: { param: Identifier | Literal | Expression, operator: string }): UnaryExpression;
}

export interface BinaryExpressionConstructor {
    new(obj: { lParam: Identifier | Literal | Expression, rParam: Identifier | Literal | Expression, operator: string }): BinaryExpression;
}

export interface AmmscConstructor {
    new(obj: { name: string, params: any[], alias?: string }): Ammsc;
}

export interface SelectStatementConstructor {
    new(): SelectStatement;
}

export interface InsertStatementConstructor {
    new(): InsertStatement;
}

export interface UpdateStatementConstructor {
    new(): UpdateStatement;
}

export interface DeleteStatementConstructor {
    new(): DeleteStatement;
}

export interface DropStatementConstructor {
    new(): DropStatement;
}

export interface AlterStatementConstructor {
    new(): AlterStatement;
}

export interface CreateStatementConstructor {
    new(): CreateStatement;
}

export type ScopeType = {
    const: KeyValue;
    //
    literal: LiteralConstructor;
    ast_root: RootConstructor;
    identifier: IdentifierConstructor;
    typedIdentifier: TypedIdentifierConstructor;
    // Expressions
    unaryExpression: UnaryExpressionConstructor;
    binaryExpression: BinaryExpressionConstructor;
    // Functions
    ammsc: AmmscConstructor;
    // Statements
    selectStatement: SelectStatementConstructor;
    insertStatement: InsertStatementConstructor;
    updateStatement: UpdateStatementConstructor;
    deleteStatement: DeleteStatementConstructor;
    // DDL Statements
    dropStatement: DropStatementConstructor;
    alterStatement: AlterStatementConstructor;
    createStatement: CreateStatementConstructor;
}
