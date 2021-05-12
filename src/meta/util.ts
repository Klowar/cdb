



export function buildType(type: string, data: Buffer): number | string | Date {

    switch (type) {
        case 'CHARACTER':
            return data.toString('utf-8')
        case 'INTEGER':
            return data.readInt32BE(0);
        default:
            throw new Error("Unknown type " + type)
    }
}
