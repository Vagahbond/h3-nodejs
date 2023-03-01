import {Router} from "express"

const router = Router()



router.get("/", (req, res) => {
    res.send("here are the things")
})

router.delete("/:id", (req, res) => {

    res.send(`deleting the ${req.params.id}th thing...`)
})

export default router