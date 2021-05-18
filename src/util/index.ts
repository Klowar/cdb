/**
 * 
 * @param a1 !SORTED array of values
 * @param a2 !SORTED array of values
 * @returns intersection between two arrays
 */
export function intersection(a1: any[], a2: any[]): any[] {
    let i1 = 0, i2 = 0;
    const result: any[] = [];

    while (i1 < a1.length && i2 < a2.length) {
        if (a1[i1] < a2[i2]) { i1++; }
        else if (a1[i1] > a2[i2]) { i2++; }
        else /* they're equal */ {
            result.push(a1[i1]);
            i1++;
            i2++;
        }
    }

    return result;
}

export function containString(target: Buffer, bytesRead: number, candidat: any, candidatSize: number) {
    let i = 0;
    const element = Buffer.alloc(candidatSize);
    element.write(candidat);
    while (!element.equals(target.subarray(i, i + candidatSize)) && i < bytesRead) i += candidatSize;
    return i < bytesRead ? i : -1;
}

export function containNumber(target: Buffer, bytesRead: number, candidat: any, candidatSize: number) {
    let i = 0;
    while (target.readInt32BE(i) != candidat && i < bytesRead) i += 4;
    return i < bytesRead ? i : -1;
}

export function substraction(a1: number[], a2: number[]): number[] {
    return a1.filter((e) => a2.indexOf(e) == -1);
}

export function union(a1: number[], a2: number[]) {
    return [...new Set(a1.concat(a2)).values()];
}

export function range(size: number): number[] {
    return [...Array(size).keys()];
}

export const dsu = (arr1, arr2) => arr1
    .map((item, index) => [arr2[index], item]) // add the args to sort by
    .sort(([arg1], [arg2]) => arg2 - arg1) // sort by the args
    .map(([, item]) => item); // extract the sorted items
