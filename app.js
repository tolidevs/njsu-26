// creating a server in node.js


const http = require('http')

// create server - will continue running as long as there are event listeners active
const server = http.createServer((req, res) => {
    // these are the important properties
    console.log(req.url, req.method, req.headers)
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