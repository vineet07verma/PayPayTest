export class NoteModel {
    POST_ID: number;
    ROW_ID: number;
    USER_IMAGE: string;
    FST_NAME: string = '';
    LAST_NAME: string = '';
    NOTE: string;
    CREATED_DT: Date;
    CREATED_BY: string;
    FROM_STATUS: string;
    TO_STATUS: string;
    LOGIN_ID: string;
    TYPE?: string;

    get USER_SHORT_NAME() {
        return this.FST_NAME.charAt(0) + this.LAST_NAME.charAt(0);
    }

    constructor(obj) {
        Object.assign(this, obj);
    }
}