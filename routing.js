// using server routing in node.js

const http = require('http')
const fs = require('fs')

// create server - will continue running as long as there are event listeners active
const server = http.createServer((req, res) => {
    // create URL variable
    const url = req.url
    const method = req.method
    // create routes
    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>Enter Message</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Send</button></form></body>')
        res.write('</html>')
        // tells server this is the end of the response, will not send back anything after this.
        return res.end()
    }
    if (url === '/message' && method === 'POST') {
        // create body object
        const body = []
        // event listener for when a new data event is fired. Parse data by pushing in chunks into the body object.
        req.on('data', (chunk) => {
            body.push(chunk)
        })
        // when finished parsing data convert body array into single object & turn to string
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            // grab content of message and create file with content of message
            const message = parsedBody.split('=')[1]
            // writefilesync is synchronous and blocks rest of code after until finished - don't use unless want that behaviour
            // fs.writeFileSync('message.txt', message)
            fs.writeFile('message.txt', message, (err) => {
                // set status code to 302: redirect, 
                res.statusCode = 302
                // set header to tell it where to redirect to
                res.setHeader('Location', '/')
                return res.end()
            })
            
        })
    }
    // sets the response headers - set type of response to text/html 
    res.setHeader('Content-Type', 'text/html')
    // sets the content of the response
    res.write('<html>')
    res.write('<head><title>My first page</title></head>')
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>')
    res.write('</html>')
    // tells server this is the end of the response, will not send back anything after this.
    res.end()
})

// create listener for server on specified port
server.listen(3003)