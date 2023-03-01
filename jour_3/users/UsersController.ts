import express from "express";
import IUser from "./IUser";
import ILoginDTO from "./ILoginDTO";

const router = express.Router();

const users: Array<IUser> = [];

router.post("/signin", (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.age) {
    res.status(422);
    res.send({
      message: "Invalid user !",
      status: "UnprocessableEntity",
    });
  }

  if (users.filter((u) => u.username == req.body.username).length > 0) {
    res.status(400);
    res.send({
      message: "User already exists",
      status: "BadRequest",
    });
  }

  const user: IUser = {
    age: req.body.age,
    password: req.body.password,
    username: req.body.username,
  };

  users.push(user);

  res.status(201);
  res.send({ message: "User created!", status: "Created" });
});

router.post("/login", (req, res) => {
  const body = req.body as ILoginDTO;
  if (!body.password || !body.username) {
    res.status(400);
    res.send({
      message: "Pls gib username and password",
      status: "BadRequest",
    });
  }

  const fileteredUsers = users.filter((u) => u.username == body.username);
  if (fileteredUsers.length < 1) {
    res.status(401);
    res.send({
      message: "User does not exist",
      status: "Unauthorized",
    });

    const connectedUser = fileteredUsers[0];

    (req.session as any).user = connectedUser;

    res.status(200);
    res.send({
      message: "logged in !",
      status: "OK",
    });
  }
});

router.delete("/signout", (req, res) => {
  if (!(req.session as any).user) {
    res.status(401);
    res.send({
      message: "You're not logged in !",
      status: "BadRequest",
    });
  }

  const username = (req.session as any).user.username
  req.session.destroy(() => {
    console.log(`disconnecting ${username}`);
  });

  res.status(200);
  res.send({
    message: "You are being disconnected",
    status: "OK",
  });
});
export default router;
