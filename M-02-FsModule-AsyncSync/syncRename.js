const fs = require('fs')

try {
    // saya menyadari tidak ada nya callback yang diperlukan ketika suatu baris code dijalakan secara syncrounous
    fs.renameSync('mwpagi.json','mwsore-gantibalek.json')

    console.log('Berhasil mengganti nama')
}catch(err) {
    console.log(err)
}