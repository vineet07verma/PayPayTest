export class SnackbarModel {
    message: string;
    action?: { 
        title: string,
        handler: Function
    };
    duration?: number;
}

