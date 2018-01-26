import { createReadStream } from "fs";


function readFile (file: string) {
    if (file && file.length) {
        console.log('Reading:', file);
        console.time('read')
        const stream = createReadStream(file)
        stream.on('end', () => {
            process.stdout.write('\n\n\n')
            console.timeEnd('read')
        })
        stream.pipe(process.stdout)
    } else {
        process.exit(1)
    }
}
readFile(__filename)
