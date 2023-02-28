import fs, { ReadStream } from "fs"


const stream: ReadStream = fs.createReadStream("consigne.md");


function countbytes(str: ReadStream) {
    let contentSize = 0;

    str.on("data", (chunk) => {
        contentSize += chunk.toString().split(/[^A-Za-zçéèêëà]/).filter(s => s).length
    })

    str.on("end", () => {
        console.log(`buffer is ${contentSize} words long ! ` )
    })

}


countbytes(stream)


//https://github.com/lmammino/streams-workshop/blob/master/03-writable-streams/exercises/http-uppercase.solution.js