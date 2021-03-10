const http = require('http')
const fs = require('fs')

const server = http.createServer((req,res) => {

    if(req.url == '/'){
        fs.readFile('index.html',(err,data) => {
            if(err) throw err
    
            res.writeHead(200,{'Content-Type': 'text/html'})
            res.write(data)
            
    
            res.end()
        })
    }
    
})

server.listen(3000,() => {
    console.log('Server is Listening to port 3000')
})

