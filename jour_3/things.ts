import {Router} from "express"

const router = Router()

router.get("/", (req, res) => {
    res.send("here are the things")
})

router.delete("/", (req, res) => {
    res.send("delething the thing...")
})

export default router