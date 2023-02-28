import * as http from "http";
import cs from "cowsay";

const handleRequest = (req: http.IncomingMessage, res: http.ServerResponse) => {
    let payload = "";

    req.on("data", (chunk) => {
      payload += chunk;
    });

    req.on("end", () => {
      res.writeHead(200);

      res.end(
          cs.say({ text: payload }),

      );
    });

}


http.createServer(handleRequest).listen(3333, () => console.log("Listening on port 3333"));
