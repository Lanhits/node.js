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
// fs.mkdir('./html', (err) => {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log('创建成功')
// })

// fs.writeFile 创建或替换文件
// fs.writeFile('./html/index.html', '你好 nodejs!!！', function (err) {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log('创建成功')
// })

// fs.appendFile 创建文件或追加文件内容
// fs.appendFile('./css/index.css', ' h2 {color: red;}', function(err) {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log('创建或追加成功')
// })

// fs.readFile()

// fs.readFile('./html/index.html', function(err, data) {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log(data)
//   console.log(data.toString())
// })


// fs.readdir 读取目录
// fs.readdir('./', function(err, data) {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log(data)
// })

// fs.rename
// fs.rename('./css/index.css', './css/css/new.css', function (err) {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log('重命名或移动文件成功')
// })

// fs.rmdir
// fs.rmdir('./css/common', function (err) {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log('删除成功')
// })

fs.unlink('./css/css/new.css', function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('删除成功')
})