"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const filename = "file.txt";
fs_1.default.readFile(filename, (err, data) => {
    if (err)
        throw err;
    fs_1.default.watchFile(filename, (curr, prev) => {
        console.log(`rewriting file at ${curr.mtime}`);
        fs_1.default.writeFile(filename, data, "utf8", () => console.log("Rewrote file back to normal."));
    });
});
