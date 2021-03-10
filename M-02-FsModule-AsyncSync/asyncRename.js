const fs = require('fs')

fs.rename('mwsore.json','mwpagi.json',(err) => {
    if (err) throw err

    console.log("Berhasil menggati path file")
})