import { join } from 'path';
import winston, { format } from 'winston';

const DATA_FOLDER = "db";
const ENTITY_CONFIG_PATH = "meta.json";

export const DATA_ROOT = join(__dirname, DATA_FOLDER);
export const CONFIG_ROOT = join(__dirname, DATA_FOLDER, ENTITY_CONFIG_PATH);

export const logger = winston.createLogger({
    level: 'debug',
    format: format.combine(
        winston.format.json(),
        format.timestamp()
    ),
    // defaultMeta: { service: 'user' },
    transports: [
        new winston.transports.File({
            filename: 'log.log', level: 'info', format: format.combine(
                winston.format.json(),
                format.timestamp()
            ),
        }),
        new winston.transports.Console({
            format: format.combine(
                winston.format.simple(),
                format.timestamp()
            )
        })
    ],
});
