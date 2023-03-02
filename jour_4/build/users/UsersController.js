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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("./User");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = User_1.CreateUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.message });
    }
    const user = new User_1.User(req.body);
    yield user.save();
    return res.status(201).json(user);
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.User.find();
    return res.status(200).json(users);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = User_1.CreateUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.message });
    }
    const user = yield User_1.User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    user.set(req.body);
    yield user.save();
    return res.status(200).json(user);
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    yield user.deleteOne();
    return res.status(204).json();
}));
exports.default = router;
