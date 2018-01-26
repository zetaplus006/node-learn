import { readFile } from "fs";


readFile(__filename, (err, buffer: Buffer) => {
    console.log(buffer.toString())
})