import express from "express"
import thingsRouter from "./things"

const port = 3000;


const app = express();

app.use((req, res, next) => {
    console.log(`Request made on ${req.url}`)

    next()
})

app.use('/things', (req, res, next) => {
    console.log(`Request made things url`)

    next()
})


app.get("/", (req, res) => {
    res.send("hello")
})


app.use("/things", thingsRouter)

app.listen(port)