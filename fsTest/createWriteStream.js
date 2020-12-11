let fs = require('fs')

// 造数据
let str = ''
for(let i  = 0; i < 50000; i++) {
  str += `第${i}文本，拉达克放假啦解放啦\n`
}

console.log(str)
let writeStream = fs.createWriteStream('./wwwroot/output.text')
writeStream.write(str)

// 标记写入完成
writeStream.end()

// 监听写入完成
writeStream.on('finish', function () {
  console.log('写入完成')
})

