import express from "express"
import thingsRouter from "./things"
import bodyParser from "body-parser"
import multer from "multer"

const upload = multer();

const port = 3000;


const app = express();

app.use(bodyParser.json())

app.use(bodyParser.urlencoded())

app.use(upload.array("filename"))

app.use('/things', (req, res, next) => {
    console.log(`Request made things url`)

    next()
})


app.get("/", (req, res) => {
    console.log(req.body.message)
    res.send(req.body)
})


app.use("/things", thingsRouter)

app.listen(port)