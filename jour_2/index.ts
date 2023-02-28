import { createServer, IncomingMessage, ServerResponse } from "http";

interface TodoList {
  description: string;
  checked: boolean;
}

const isTodoValid = (todo: TodoList): boolean => {
  if (!todo.description) {
    return false;
  }

  if (!todo.checked) {
    return false;
  }
  return true;
};

const todos: Array<TodoList> = [];

const handleGet = (req: IncomingMessage, res: ServerResponse) => {
  const urlArray = req.url?.split("/") ?? [];
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

const handlePost = (req: IncomingMessage, res: ServerResponse) => {
  const urlArray = req.url?.split("/") ?? [];

  let payload = "";

  req.on("data", (chunk) => {
    payload += chunk;
  });

  req.on("end", () => {
    switch (urlArray[1]) {
      case "todolists":
        const todo = JSON.parse(payload) as TodoList;

        if (!isTodoValid(todo)) {
          res.writeHead(422, { "Content-type": "application/json" });
          res.end(
            JSON.stringify({
              status: "Failure",
              message: "Unprocessable entity",
            })
          );
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

const handleMethod = (req: IncomingMessage, res: ServerResponse) => {
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

const handleRequest = (req: IncomingMessage, res: ServerResponse) => {
  handleMethod(req, res);
};

createServer(handleRequest).listen(3333, () =>
  console.log("Listening on port 3333")
);
