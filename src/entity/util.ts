

export function getBlockSize(type: string): number {
    switch (type) {
        case 'INTEGER':
            return 4;
        case 'VARCHAR':
            return -1;
        default:
            throw new Error("Unknown type " + type);
    }
}

