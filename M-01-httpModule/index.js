const server = require('http')

server.createServer((req,res) => {
    res.writeHead(200,{'Content-Type': 'text/html'})
    res.write("Module HTTP Mobile And Web")  
    res.end()
}).listen(2000)