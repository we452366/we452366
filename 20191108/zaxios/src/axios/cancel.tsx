export class Cancel {
    constructor(public reason: string) { }
}
export function isCancel(error: any) {
    return error instanceof Cancel;
}
export class CancelToken {
    public resolve: any;
    source() {
        return {
            token: new Promise((resolve) => {
                this.resolve = resolve;
            }),
            cancel: (reason: string) => {
                this.resolve(new Cancel(reason));
            }
        }
    }
}