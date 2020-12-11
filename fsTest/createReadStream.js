const fs = require('fs')


let readStream = fs.createReadStream('./wwwroot/output.text')

let count = 0
let str = ''
readStream.on('data', function (data) {
  str += data
  count++
})


readStream.on('end', function () {
  console.log(str)
  console.log(count)
})

readStream.on('error', function (err) {
  console.log(err)
})
