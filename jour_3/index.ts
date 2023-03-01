import express from "express"
import thingsRouter from "./things"

const port = 3000;


const app = express();

app.get("/", (req, res) => {
    res.send("hello")
})


app.use("/things", thingsRouter)

app.listen(port)