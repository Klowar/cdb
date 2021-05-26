import { Socket } from 'net';
import { getQueryBuilder, QueryBuilder } from '../builder';
import { Executor, newExecutor } from '../exec';
import { Connection } from './../net/connection';
import { Parser } from './../parser/index';
import { Root } from './../parser/types';

export type Core = {
    connections: Connection[];
    parser: Parser;
    queryBuilder: QueryBuilder;
    executor: Executor;
    process: (root: Root) => Promise<any>;
    addConnection: (conn: Socket) => void;
    onConnectionData: (event: string, connection: Connection) => void;
}

function Core(this: Core, config) {
    this.connections = [];
    this.parser = new Parser();
    this.queryBuilder = getQueryBuilder({});
    this.executor = newExecutor({});
}

Core.prototype.addConnection = function (this: Core, conn: Connection) {
    conn.addListener("data", (event: string,) => this.onConnectionData(event, conn));
    this.connections.push(conn);
}

Core.prototype.onConnectionData = function (this: Core, event: string, connection: Connection) {
    try {

        const parseResult = this.parser.parse(event);
        if (!parseResult) return;
        const execResult = this.process(this.parser.parser.yy.ast);
        execResult.then((data) => connection.write(JSON.stringify(data) + '\n'));
        execResult.catch((e) => connection.write(JSON.stringify(e) + '\n'));
    } catch (e) {
        console.error(e);
        connection.write(JSON.stringify(e) + '\n');
    }
}

Core.prototype.process = function (this: Core, ast: Root) {
    return this.executor.process(ast);
}

let coreInstance: Core | null = null;

export function getCore(): Core | null {
    return coreInstance;
}

export function newCore(config): Core {
    return coreInstance = new Core(config);
}
