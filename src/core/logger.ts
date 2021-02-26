export function logger() {}

logger.prototype = {
    log: console.log,
    error: console.error,
    debug: console.debug
}
