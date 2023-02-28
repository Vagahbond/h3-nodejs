import fs from "fs";
import os from "os";

const stream = fs.createWriteStream("file.txt", "utf8");

let runningFlag = true;

stream.write("starting logs\n")

const loop = async () => {
  // Attendre une seconde pour executer le callback
  await setTimeout(() => {
    // la fonction se rappelle dans son propre callback
    stream.write(`${Date.now()} - on host : ${os.hostname()} - total memory : ${os.totalmem} - free memory : ${os.freemem}\n`)

    if (runningFlag)
      loop();
  }, 1000);
};

loop();


setTimeout(() => {
  runningFlag = false;
  stream.end("ending stream\n")

}, 20000)