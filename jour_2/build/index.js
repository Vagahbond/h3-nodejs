"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const stream = fs_1.default.createWriteStream("file.txt", "utf8");
let runningFlag = true;
stream.write("starting logs\n");
const loop = () => __awaiter(void 0, void 0, void 0, function* () {
    // Attendre une seconde pour executer le callback
    yield setTimeout(() => {
        // la fonction se rappelle dans son propre callback
        stream.write(`${Date.now()} - on host : ${os_1.default.hostname()} - total memory : ${os_1.default.totalmem} - free memory : ${os_1.default.freemem}\n`);
        if (runningFlag)
            loop();
    }, 1000);
});
loop();
setTimeout(() => {
    runningFlag = false;
    stream.end("ending stream\n");
}, 20000);
