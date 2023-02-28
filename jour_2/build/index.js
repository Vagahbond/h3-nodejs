"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const isTodoValid = (todo) => {
    if (!todo.description) {
        return false;
    }
    if (!todo.checked) {
        return false;
    }
    return true;
};
const todos = [];
const handleGet = (req, res) => {
    var _a, _b;
    const urlArray = (_b = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split("/")) !== null && _b !== void 0 ? _b : [];
    switch (urlArray[1]) {
        case "todolists":
            if (urlArray[2]) {
                res.writeHead(200, { "Content-type": "application/json" });
                res.end(JSON.stringify(todos[parseInt(urlArray[2])]));
                return;
            }
            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(todos));
            break;
        default:
            break;
    }
};
const handlePost = (req, res) => {
    var _a, _b;
    const urlArray = (_b = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split("/")) !== null && _b !== void 0 ? _b : [];
    let payload = "";
    req.on("data", (chunk) => {
        payload += chunk;
    });
    req.on("end", () => {
        switch (urlArray[1]) {
            case "todolists":
                const todo = JSON.parse(payload);
                if (!isTodoValid(todo)) {
                    res.writeHead(422, { "Content-type": "application/json" });
                    res.end(JSON.stringify({
                        status: "Failure",
                        message: "Unprocessable entity",
                    }));
                }
                todos.push(todo);
                res.writeHead(201, { "Content-type": "application/json" });
                res.end(JSON.stringify({ status: "Success !" }));
                break;
            default:
                break;
        }
    });
};
const handleMethod = (req, res) => {
    switch (req.method) {
        case "GET":
            handleGet(req, res);
            break;
        case "POST":
            handlePost(req, res);
            break;
        case "DELETE":
            break;
        default:
            throw Error("Invalid method!");
            break;
    }
};
const handleRequest = (req, res) => {
    handleMethod(req, res);
};
(0, http_1.createServer)(handleRequest).listen(3333, () => console.log("Listening on port 3333"));
