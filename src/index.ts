import { getCore } from './core';
import { server } from './net/server';

const ENTITY_CONFIG_PATH = "./meta.json";
const app = getCore({});
const serv = new server();

// const entityConfig = existsSync(ENTITY_CONFIG_PATH)
//                     ? require(ENTITY_CONFIG_PATH) 
//                     : {};

// serv.addListener("connect", console.log);
serv.addListener("connect", (c) => app.addConnection(c));
serv.getPhysicalServer().listen(9999, "localhost");
