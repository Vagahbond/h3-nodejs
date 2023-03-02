import joi from 'joi';
import mongoose from 'mongoose';

export const CreateUserSchema = joi.object({
    id: joi.number().integer().required(),
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
});


const userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    password: String,
    created_at: Date,
    updated_at: Date
 });

export const User = mongoose.model("Person", userSchema);