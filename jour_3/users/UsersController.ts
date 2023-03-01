import express from "express";
import IUser from "./IUser";

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
    res.status(400)
    res.send({
        message: "User already exists",
        status: "BadRequest",
      })
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
export default router;
