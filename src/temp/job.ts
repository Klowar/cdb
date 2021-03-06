import { logger } from './../globals';
import { TemporaryFile } from '.';
import { DEFAULT_FLUSH_TICK, MAX_FLUSH_SIZE, FLUSH_CALL_WATERLINE } from './constants';

export type StreamJob = {
    file: TemporaryFile;
    interval: NodeJS.Timeout;
    lastFlush: number;
    lock: boolean;
    stop: () => void
    start: () => void;
    check: () => void;
}


export function StreamJob(this: StreamJob, tf: TemporaryFile) {
    this.file = tf;
}

StreamJob.prototype.start = function (this: StreamJob) {
    logger.info("Stream job start");
    this.interval = setInterval(this.check.bind(this), DEFAULT_FLUSH_TICK);
    this.lastFlush = Date.now();
    return this;
}

StreamJob.prototype.stop = function (this: StreamJob) {
    logger.info("Stream job stop");
    clearInterval(this.interval);
    return this;
}

StreamJob.prototype.check = async function (this: StreamJob) {
    logger.info("Stream job check");
    const end = this.file.vf.getBlockAmount();
    const start = this.file.streamOffset;
    const difference = end - start > MAX_FLUSH_SIZE ? MAX_FLUSH_SIZE : end - start;
    // If no enouth records or no forced time to flush - skip
    if (end - start <= FLUSH_CALL_WATERLINE || this.lock) return;
    this.lock = true;
    // Flush data from writeOnly to readOnly storage
    this.lastFlush = Date.now();
    const data: any[] = await this.file.vf.readRange(start, start + difference);
    for (const value of data) {
        const offset = await this.file.target.getOffset(value);
        if (offset === -1) await this.file.target.write(value);
        else await this.file.target.writeRecord(offset, value);
    }
    this.file.streamOffset = start + difference;
    this.lock = false;
    logger.info("Stream job", data);
}
