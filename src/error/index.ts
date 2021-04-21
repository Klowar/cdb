export class NeverError extends Error {
    // если дело дойдет до вызова конструктора с параметром - ts выдаст ошибку
    constructor(value: never) {
        super(`Unreachable statement: ${value}`);
    }
}
