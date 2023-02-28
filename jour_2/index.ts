import fs, { ReadStream } from "fs"


const stream: ReadStream = fs.createReadStream("4_Fichiers.pdf");


function countbytes(str: ReadStream) {
    let contentSize = 0;

    str.on("data", (chunk) => {
        contentSize += chunk.length
    })

    str.on("end", () => {
        console.log(`buffer is ${contentSize} bytes long ! ` )
    })

}


countbytes(stream)