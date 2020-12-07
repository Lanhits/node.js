let fs = require('fs')

// // fs.stat 测试
// fs.stat('./fsTest.js', function(err, data) {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log(`是否为文件: ${data.isFile()},是否为目录${data.isDirectory()}`)
// })

// // fs.mkdir
fs.mkdir('./css/css', (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('创建成功')
})