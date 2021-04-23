export function getBlockSize(type: string): number {
    switch (type) {
        case 'CHARACTER':
            return 2;
        case 'INTEGER':
            return 2;
        default:
            throw new Error("Unknown type " + type);
    }
}