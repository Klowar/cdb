import {join} from 'path';

const DATA_FOLDER = "data";
const ENTITY_CONFIG_PATH = "meta.json";

export const DATA_ROOT = join(__dirname, DATA_FOLDER);
export const CONFIG_ROOT = join(__dirname, DATA_FOLDER, ENTITY_CONFIG_PATH);
