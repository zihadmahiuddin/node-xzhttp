const Request = require("./request");
const http = require("http");

class Xzhttp {
    constructor() {
        this.links = {};
    }
    
    link(path, func) {
        this.links[path] = func;
        return this;
    }
    
    handle(req, res) {
        var Reqh = new Request (req, res);
        
        if (App.links[Reqh.path]) {
            //if it is registered
            App.links[Reqh.path](Reqh);
        } else {
            //404
            res.statusCode = 404;
            res.write("404 Not Found");
            res.end();    
        }
    }
    
    listen(port, host) {
        this.server = http.createServer(this.handle).listen(port, host);
        return this;
    }
}

module.exports = Xzhttp;