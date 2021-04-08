import { ExecutorType } from './../exec/index';

export type QueryBuilderType = {
    executor: ExecutorType
}

function QueryBuilder(this: QueryBuilderType, config) {
    this.executor = config.executor;
}

QueryBuilder.prototype.process = function (request) {
    console.log("Checks for other request to same data to compose", request);
}

export function getQueryBuilder(config) {
    return new QueryBuilder(config);
}
