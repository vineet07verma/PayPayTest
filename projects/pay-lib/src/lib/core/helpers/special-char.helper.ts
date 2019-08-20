export class SpecialCharHelper {

    constructor() { }

    static remove(str: string) {
        str = str.replace(/[^a-zA-Z0-9@.-/ ]/g, "");
        return str;
    }

    static removeAll(str: string) {
        str = str.replace(/[^\w\s]/gi, '');
        return str;
    }
}

