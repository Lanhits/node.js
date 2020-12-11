const fs = require('fs')

const writeSteam = fs.createWriteStream('./wwwroot/bbb.jpg')
const readStream = fs.createReadStream('./aaa.jpg')

readStream.pipe(writeSteam)
