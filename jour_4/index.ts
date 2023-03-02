import express from "express"
import mongoose from "mongoose"
import usersRouter from "./users/UsersController"

mongoose.connect("mongodb://anon:marbleCake@localhost:27017/my_db")


const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use("/users", usersRouter)

app.listen(3000, () => {
    console.log("Server is running")
})

