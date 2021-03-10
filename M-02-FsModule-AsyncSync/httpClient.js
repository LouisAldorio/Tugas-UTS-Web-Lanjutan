const http = require('http')

const option = {
    hostname: "www.google.com",
    port: 80,
    path: "/",
    method: "GET",
    header: "application/json"
}

const req = http.request(option, (response) => {
    console.log(response.statusCode)
    console.log(response.statusMessage)
    console.log(response.headers)
})

req.on('error' ,(e) => {
    console.log("Error : "+ e.message)
})
req.end()

