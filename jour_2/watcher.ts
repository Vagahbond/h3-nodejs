import fs from "fs";

const filename = "file.txt";

fs.readFile(filename, (err, data) => {
  if (err) throw err;

  fs.watchFile(filename, (curr, prev) => {
    console.log(`rewriting file at ${curr.mtime}`);

    fs.writeFile(filename, data, "utf8", () =>
      console.log("Rewrote file back to normal.")
    );
  });
});
