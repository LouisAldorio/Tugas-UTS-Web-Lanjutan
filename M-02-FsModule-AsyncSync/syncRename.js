const fs = require('fs')

try {
    fs.renameSync('mwpagi.json','mwsore-gantibalek.json')

    console.log('Berhasil mengganti nama')
}catch(err) {
    console.log(err)
}