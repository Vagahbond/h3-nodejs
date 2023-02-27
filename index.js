import fs from "fs"



// fs.writeFile("text.json", JSON.stringify({a: 'test'}), () => {
//     console.log("done")
// })

console.log("not done")

fs.readFile("text.json", (err, data) => {
    if (err) throw err

    console.log(Buffer.from(data).toString())
})