import { environment } from '../../environments/environment';


export const URL_CONFIG = {
    loginAPI: environment.baseEndpoint+'/assets/api/login.json',
    userAPI: environment.baseEndpoint+'/assets/api/users.json',
    reviewsAPI: environment.baseEndpoint+'/assets/api/reviews.json'
}