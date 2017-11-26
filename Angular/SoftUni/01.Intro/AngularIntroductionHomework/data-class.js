var MyRequest = /** @class */ (function () {
    function MyRequest(method, uri, version, message) {
        this.method = method;
        this.uri = uri;
        this.version = version;
        this.message = message;
        this.response = undefined;
        this.fulfilled = false;
    }
    return MyRequest;
}());
var myData = new MyRequest('GET', 'http://google.com', 'HTTP/1.1', '');
myData.message;
