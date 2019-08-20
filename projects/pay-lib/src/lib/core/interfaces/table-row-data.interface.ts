export interface ITableRowData {
    hidden?: boolean;
    selected?: boolean;
    path?: string;
    edit?: boolean;
    editError?: {}; // For Example editErrors['name'] = 'Can't be blank';
}