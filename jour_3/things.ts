import {Router} from "express"

const router = Router()

router.use((req, res, next) => {
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

router.get("/", (req, res) => {
    res.send("here are the things")
})

router.delete("/:id", (req, res) => {

    res.send(`deleting the ${req.params.id}th thing...`)
})

export default router