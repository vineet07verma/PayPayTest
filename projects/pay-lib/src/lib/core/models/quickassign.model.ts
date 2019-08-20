/**
    Extend this model to be able to QuickAssign attribute to your model via the constructor.
    for example, if you have a model Profile{ name:string; age:number }, you can create a
    new Profile instance and set it values with the constructor: new Profile({age: 39, name: John});
 */
export class QuickAssign {
    constructor(obj?: Object) {
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                this[prop] = obj[prop];
            }
        }
    }
}
