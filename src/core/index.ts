import { Socket } from 'net';
import { getQueryBuilder, QueryBuilderType } from '../builder';
import { ExecutorType, newExecutor } from '../exec';
import { ConnectionType } from './../net/connection';
import { Parser, ParserType } from './../parser/index';

export type CoreType = {
    connections: ConnectionType[];
    parser: ParserType;
    queryBuilder: QueryBuilderType;
    executor: ExecutorType;
}

function Core(this: CoreType, config) {
    this.connections = [];
    this.parser = new Parser();
    this.queryBuilder = getQueryBuilder({});
    this.executor = newExecutor({});
}

Core.prototype.addConnection = function (conn) {
    conn.addListener("data", (event,) => this.onConnectionData(event, conn));
    this.connections.push(conn);
}

Core.prototype.onConnectionData = function (event: string, connection: Socket) {
    try {

        const parseResult = this.parser.parse(event);
        if (!parseResult) return;
        const execResult = this.executor.process(this.parser.parser.yy.ast);
        connection.write(JSON.stringify(execResult) + '\n');
    } catch (e) {
        console.error(e);
        connection.write(JSON.stringify(e) + '\n');
    }
}

let coreInstance = null;

export function getCore() {
    return coreInstance;
}

export function newCore(config) {
    return coreInstance = new Core(config);
}
