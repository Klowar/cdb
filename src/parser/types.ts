export type Literal = {
    value: string | number;
}

export type Identifier = {
    name: string;
    alias: string;
    scope: Identifier;
}

export type TypedIdentifier = {
    name: string;
    type: string;
}

export type Expression = {
    operator: string;
}

export type UnaryExpression = Expression & {
    param: string;
}

export type BinaryExpression = Expression & {
    lParam: Identifier | Literal | Expression;
    rParam: Identifier | Literal | Expression;
}

export type Statement = {
    type: string;
    schema: string;
    target: Identifier;
}

export type CreateStatement = Statement & {
    columns: TypedIdentifier[]
}

export type AlterStatement = Statement & {
    expressions: Expression[]
}

export type DropStatement = Statement;

export type SelectStatement = Statement & {
    where: Expression;
    columns: Identifier[];
}

export type InsertStatement = Statement & {
    values: Literal[];
    columns: Identifier[];
}

export type UpdateStatement = Statement & {
    where: Expression;
    expressions: Expression[];
}

export type DeleteStatement = Statement & {
    where: Expression;
}

export type Root = {
    objects: any[];
    statement: Statement;
}

