"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const stream = fs_1.default.createReadStream("4_Fichiers.pdf");
function countbytes(str) {
    let contentSize = 0;
    str.on("data", (chunk) => {
        contentSize += chunk.length;
    });
    str.on("end", () => {
        console.log(`buffer is ${contentSize} bytes long ! `);
    });
}
countbytes(stream);
