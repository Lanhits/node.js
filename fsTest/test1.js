const fs = require('fs')
const path = './upload'
fs.stat(path, function(err, data) {
  if (err) {
    console.log(err)
    mkdir(path)
    return
  }
  if (data.isDirectory()) {
    console.log('目录已存在')
  } else {
    fs.unlink(path, function (err) {
      if (err) {
        console.log(err)
        return
      }
      console.log('删除成功')
      mkdir(path)
    })
  }
})


function mkdir (path) {
  fs.mkdir(path, function(err) {
    if (err) {
      console.log(err)
      return
    }
    console.log('创建成功')
  })
}
