import { logger } from './../globals';
import { Executor } from './../exec/index';
import { Root } from './../parser/types';

export type QueryBuilder = {
    executor: Executor,
}

function QueryBuilder(this: QueryBuilder, config) {
    this.executor = config.executor;
}

QueryBuilder.prototype.process = function (this: QueryBuilder, request: Root) {
    logger.debug("Checks for other request to same data to compose", request);
}

export function getQueryBuilder(config): QueryBuilder {
    return new QueryBuilder(config);
}
