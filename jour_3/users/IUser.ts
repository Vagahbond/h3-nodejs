import { Agent } from "http";
import joi from "joi"

export const userSchema = joi.object({
    username: joi.string().alphanum(),
    age: joi.number().min(0).max(100),
    password: joi.string()
})

interface IUser {
    username: string;
    password: string;
    age: number;
}



export default IUser

