import { join } from 'path';
import winston from 'winston';

const DATA_FOLDER = "db";
const ENTITY_CONFIG_PATH = "meta.json";

export const DATA_ROOT = join(__dirname, DATA_FOLDER);
export const CONFIG_ROOT = join(__dirname, DATA_FOLDER, ENTITY_CONFIG_PATH);

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    // defaultMeta: { service: 'user' },
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    ],
});
