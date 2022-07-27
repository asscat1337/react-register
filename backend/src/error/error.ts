export class CustomError extends Error {
    readonly auth:boolean;
    readonly message:string
    constructor({auth,message}:any) {
        super();
        this.auth = auth
        this.message = message
    }
}