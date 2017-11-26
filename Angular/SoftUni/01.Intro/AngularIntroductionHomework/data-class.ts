
class MyRequest {
    method: string;
    uri: string;
    version: string;
    message: string

    response: string;
    fulfilled: boolean; 

    constructor(method: string, uri: string, version: string, message: string) {
        this.method = method;
        this.uri = uri;
        this.version = version;
        this.message = message;

        this.response = undefined;
        this.fulfilled = false;
    }
}


let myData = new MyRequest('GET', 'http://google.com', 'HTTP/1.1', '')
myData.message