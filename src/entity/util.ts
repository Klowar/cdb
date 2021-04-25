export function getBlockSize(type: string): number {
    switch (type) {
        case 'CHARACTER':
            return 100;
        case 'INTEGER':
            return 4;
        default:
            throw new Error("Unknown type " + type);
    }
}