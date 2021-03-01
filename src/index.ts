import { engine } from './core/engine';
import { server } from './net/server';

const ENTITY_CONFIG_PATH = "./meta.json";
const cdb = new engine();
const serv = new server();

// const entityConfig = existsSync(ENTITY_CONFIG_PATH)
//                     ? require(ENTITY_CONFIG_PATH) 
//                     : {};

serv.addListener("connect", console.log);
serv.getPhysicalServer().listen(9999, "localhost");
