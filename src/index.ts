import { existsSync } from 'fs';
import { engine } from './core/engine';
import { initDb } from './core/entity';
import { getServer } from './net/server';

const ENTITY_CONFIG_PATH = "./meta.json";
const cdb = new engine();

const entityConfig = existsSync(ENTITY_CONFIG_PATH)
                    ? require(ENTITY_CONFIG_PATH) 
                    : {};

initDb(entityConfig, cdb.enitityMap);

getServer().listen(9999, "localhost")
