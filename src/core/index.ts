import { Socket } from 'net';
import { getQueryBuilder, QueryBuilderType } from '../builder';
import { ExecutorType, getExecutor } from '../exec';
import { getParser, ParserType } from './../parser/index';

export type CoreType = {
    parser: ParserType,
    queryBuilder: QueryBuilderType,
    executor: ExecutorType
}

function Core(config) {
    this.connections = [];
    this.parser = getParser();
    this.queryBuilder = getQueryBuilder({});
    this.executor = getExecutor({});
}

Core.prototype.addConnection = function (conn) {
    conn.addListener("data", (event,) => this.onConnectionData(event, conn));
    this.connections.push(conn);
}

Core.prototype.onConnectionData = function (event: string, connection: Socket) {
    try {

        const parseResult = this.parser.parse(event);
        if (!parseResult) return;
        connection.write(JSON.stringify(this.parser.parser.yy.ast) + '\n');
    } catch (e) {
        connection.write(JSON.stringify(e) + '\n');
    }
}

export function getCore(config) {
    return new Core(config);
}
