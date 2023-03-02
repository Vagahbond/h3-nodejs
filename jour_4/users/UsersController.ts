import { Router } from "express";
import { hashPassword } from "../services/hashService";
import { User, CreateUserSchema, UpdateUserSchema } from "./User";

const router = Router();

const removePassword = (user: any) => {
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

router.post("/", async (req, res) => {
  const { error } = CreateUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  const user = new User({
    ...req.body,
    password: hashPassword(req.body.password),
  });
  await user.save();
  return res.status(201).json(removePassword(user.toObject()));
});

router.get("/", async (req, res) => {
  const users = await User.find();
  return res
    .status(200)
    .json(removePassword(users.map((user) => removePassword(user.toObject()))));
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.status(200).json(user);
});

router.put("/:id", async (req, res) => {
  const { error } = UpdateUserSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  user.set(req.body);
  await user.save();
  return res.status(200).json(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  await user.deleteOne();
  return res.status(204).json();
});

export default router;
