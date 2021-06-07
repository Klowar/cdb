import { Union } from '.';
import scope from '../parser/sqope';
import { BinaryExpression, DeleteStatement, SelectStatement, UpdateStatement } from '../parser/types';
import { intersection } from '../util';
import { Identifier, Literal } from './../parser/types';
import { castTo } from './util';

export type Filter = {
    union: Union,
    processWhere: (statement: SelectStatement | UpdateStatement | DeleteStatement) => Promise<number[]>;
}

export function Filter(this: Filter, union: Union) {
    this.union = union;
}

Filter.prototype.processWhere = async function (this: Filter, statement: SelectStatement | UpdateStatement | DeleteStatement) {
    if (statement.where == null) return [];
    // Planarize
    const planeExpression: BinaryExpression[] = planarize(statement.where as BinaryExpression);
    const entityIndicies = await Promise.all(
        planeExpression.map((_) => {
            const target = _.lParam as Identifier;
            const literal = _.rParam as Literal;
            if (target.name == this.union.name) return [Number(literal.value)];
            const entity = this.union.getEntity(target.name);
            return entity.getIndices(castTo(entity.getType(), literal).value);
        })
    );

    return entityIndicies.reduce((p, c) => intersection(p, c));
}

export function planarize(expression: BinaryExpression) {
    const planeExpression: BinaryExpression[] = [];
    while (expression.rParam instanceof scope.prototype.binaryExpression) {
        planeExpression.push(expression.rParam as BinaryExpression);
        expression = expression.lParam as BinaryExpression;
    }
    planeExpression.push(expression);
    return planeExpression;
}
