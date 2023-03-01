"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const stream = fs_1.default.createReadStream("consigne.md");
function countbytes(str) {
    let contentSize = 0;
    str.on("data", (chunk) => {
        contentSize += chunk.toString().split(/[^A-Za-zçéèêëà]/).filter(s => s).length;
    });
    str.on("end", () => {
        console.log(`buffer is ${contentSize} words long ! `);
    });
}
countbytes(stream);
//https://github.com/lmammino/streams-workshop/blob/master/03-writable-streams/exercises/http-uppercase.solution.js
