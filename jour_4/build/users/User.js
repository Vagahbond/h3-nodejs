"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.CreateUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.CreateUserSchema = joi_1.default.object({
    id: joi_1.default.number().integer().required(),
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
const userSchema = new mongoose_1.default.Schema({
    id: Number,
    name: String,
    email: String,
    password: String,
    created_at: Date,
    updated_at: Date
});
exports.User = mongoose_1.default.model("Person", userSchema);
