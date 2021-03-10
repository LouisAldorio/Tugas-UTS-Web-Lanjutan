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

    //saya menggunakan location dimana apabila ketika mendapat redicrect URl saya tahu kemana akan di redirect berhubung kita menggunakan http sering kali kita mendapat redicrect line k https
    console.log(response.headers.location)
})

req.on('error' ,(e) => {
    console.log("Error : "+ e.message)
})
req.end()

