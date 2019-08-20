export class ReplyModel {
    ROW_ID: number;
    USER_IMAGE: string;
    FST_NAME: string;
    LAST_NAME: string;
    COMMENT: string;
    LIKE_COUNT: number;
    CREATED_DT: Date;
    TYPE?: string;
    IS_LIKED_BY_ME?: boolean = false;

    get USER_SHORT_NAME() {
        return this.FST_NAME.charAt(0) + this.LAST_NAME.charAt(0);
    }

    constructor(obj) {
        Object.assign(this, obj);
    }
}

export class CommentModel extends ReplyModel {
    REPLIES: Array<ReplyModel> = [];

    constructor(obj) {
        super(obj);
        Object.assign(this, obj);
    }
}