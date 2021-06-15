import { intersection, union } from 'lodash';
import { Union } from '..';
import scope from '../../parser/sqope';
import { BinaryExpression } from '../../parser/types';
import { Identifier, Literal } from '../../parser/types';
import { LodashComparator } from './compare/lodash';
import { castTo } from '../util';



export type Filter = {
    union: Union,
    getMatchingIndices: (where: BinaryExpression) => Promise<number[]>;
    getMatchingValues: (where: BinaryExpression) => Promise<any[][]>;
}

export function Filter(this: Filter, union: Union) {
    this.union = union;
}

Filter.prototype.getMatchingIndices = async function (this: Filter, where: BinaryExpression) {
    // Planarize
    const entityIndicies: number[][] = [];
    const planeExpression: BinaryExpression[] = planarize(where as BinaryExpression);
    const values = await this.getMatchingValues(where);
    for (let i = 0; i < planeExpression.length; i++) {
        const expression = planeExpression[i];
        const entityValues = values[i];
        const target = expression.lParam as Identifier;
        const literal = expression.rParam as Literal;
        if (target.name == this.union.name) entityIndicies.push([Number(literal.value)]);
        if (entityValues.length == 0 || target.name == this.union.name) continue;
        const entity = this.union.getEntity(target.name);
        const ids = (await Promise.all(entityValues.map(_ => entity.getIndices(_))))
            .reduce((p, c) => union(p, c));
        entityIndicies.push(ids);
    }

    return entityIndicies.length > 0 ? entityIndicies.reduce((p, c) => intersection(p, c)) : [];
}

Filter.prototype.getMatchingValues = async function (this: Filter, where: BinaryExpression): Promise<any[][]> {
    const planeExpression: BinaryExpression[] = planarize(where as BinaryExpression);
    const matchingValues = Promise.all(
        planeExpression.map(async (_) => {
            const target = _.lParam as Identifier;
            const literal = _.rParam as Literal;
            if (target.name == this.union.name) return [];
            const entity = this.union.getEntity(target.name);
            return entity.getValues(new LodashComparator(castTo(entity.getType(), literal).value, _.operator));
        })
    );
    return matchingValues;
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
