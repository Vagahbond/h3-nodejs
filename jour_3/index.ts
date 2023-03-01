import express from "express"
import thingsRouter from "./things"
import usersRouter from "./users/UsersController"
import bodyParser from "body-parser"
import multer from "multer"
import cookieParser from "cookie-parser"
import expressSession from "express-session"

const upload = multer();

const port = 3000;


const app = express();

app.use(bodyParser.json())

app.use(bodyParser.urlencoded())

app.use(cookieParser())

app.use(expressSession({secret: "secret"}))

app.use(upload.array("filename"))

app.use('/things', (req, res, next) => {
    console.log(`Request made things url`)

    next()
})


app.get("/", (req, res) => {
    if ((req.session as any).page_views) {
        (req.session as any).page_views++
    } else {
        (req.session as any).page_views = 1
    }

    // res.cookie("user", "unknown", { maxAge: 360000 })
    res.clearCookie("user")
    res.send(`Page visited ${(req.session as any).page_views} times.`)
})


app.use("/things", (req, res, next) => {
    (req.session as any).user ?
    next() :
    res.status(401)
    res.send(
        {
            message: "Please login to access this resource",
            status: "unauthorized"
        }
    )
})

app.use("/things", thingsRouter)


app.use("/users", usersRouter)

app.listen(port)