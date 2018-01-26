import { createServer, IncomingMessage, ServerResponse } from "http";
import { readFile, createReadStream } from 'fs';
import { promisify } from "util";
import { createGzip } from "zlib";

const readFileAsync = promisify(readFile)


createServer(async (request: IncomingMessage, response: ServerResponse) => {
    /* try {
        const data = await readFileAsync(__dirname + '/index.html')
        response.end(data)
    } catch (error) {
        response.statusCode = 500
        response.end(String(error))
    } */
    response.setHeader('content-encoding', 'gzip')
    createReadStream(__dirname + '/index.html').pipe(createGzip()).pipe(response)
}).listen(8000)

