import { Union } from '.';
import scope from '../parser/sqope';
import { BinaryExpression, DeleteStatement, SelectStatement, UpdateStatement } from '../parser/types';
import { intersection } from '../util';
import { Identifier, Literal } from './../parser/types';

export type Filter = {
    union: Union,
    processWhere: (statement: SelectStatement | UpdateStatement | DeleteStatement) => Promise<number[]>;
}

export function Filter(this: Filter, union: Union) {
    this.union = union;
}

Filter.prototype.processWhere = async function (this: Filter, statement: SelectStatement | UpdateStatement | DeleteStatement) {
    if (statement.where == null) return [];
    let where = statement.where as BinaryExpression;
    // Planarize
    const planeExpression: BinaryExpression[] = [];
    while (where.rParam instanceof scope.prototype.binaryExpression) {
        planeExpression.push(where.rParam as BinaryExpression);
        where = where.lParam as BinaryExpression;
    }
    planeExpression.push(where);
    const entityIndicies = await Promise.all(
        planeExpression.map((_) => this.union.getEntity((_.lParam as Identifier).name).getIndices(_.rParam as Literal))
    );

    return entityIndicies.reduce((p, c) => intersection(p, c));
}
