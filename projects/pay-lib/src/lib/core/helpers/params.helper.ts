import { HttpParams } from '@angular/common/http';

export class ParamsHelper {
    public static getQueryParams(paramsObject) {
        let httpParams = new HttpParams();
        Object.keys(paramsObject).forEach(key => {
             httpParams = httpParams.append(key, paramsObject[key]);
        });
        return httpParams;
    }
}