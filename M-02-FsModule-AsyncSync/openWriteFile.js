const fs = require('fs')

fs.open('datamw.txt',"w+",(err,file) => {
    if (err) throw err

    let data = "Kelas Mobile And web , Louis Aldorio"

    fs.writeFile(file,data,(err) => {
        if(err) throw err
        console.log("berhasil menulis ke file")
    })
    
    fs.readFile('datamw.txt',(err,isiFile) => {
        if(err) throw err
        console.log(isiFile.toString())
    })
})