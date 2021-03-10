const fs = require('fs')

fs.appendFile('mw.txt','kelas Mobile And Web', (err) => {
    if(err) throw err
    console.log("Berhasil disimpan")
})