const fs = require('fs')
const resarr = []

// 方法一
fs.readdir('./wwwroot', function(err, data) {
  if (err) {
    console.log(err)
    return
  }
  console.log(data)
  data.map((item, index) => {
    fs.stat('./wwwroot/' + item, function (err, statdata) {
      if (err) {
        console.log(err)
        return
      }
      if (statdata.isDirectory()) {
        resarr.push(item)
        if (index == data.length - 1) { // 判断全部执行完成 当然可以使用递归解决
          console.log(resarr) // 这里使用的时候要注意异步问题
        }
      }
    })
  })
})

