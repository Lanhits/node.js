const { rejects } = require('assert')
const fs = require('fs')
const resarr = []

// 方法一
// fs.readdir('./wwwroot', function(err, data) {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log(data)
//   data.map((item, index) => {
//     fs.stat('./wwwroot/' + item, function (err, statdata) {
//       if (err) {
//         console.log(err)
//         return
//       }
//       if (statdata.isDirectory()) {
//         resarr.push(item)
//         if (index == data.length - 1) { // 判断全部执行完成 当然可以使用递归解决 也可以用回调函数来解决
//           console.log(resarr) // 这里使用的时候要注意异步问题
//         }
//       }
//     })
//   })
// })


// 方法二

// 注意： await 关键字一定要写在 async 方法里面

function main () {
  const resarr1 = []
  fs.readdir('./wwwroot', async function (err, data) {
    if (err) {
      console.log(err)
      return
    }
    for (let i = 0; i < data.length; i++) {
      if (await isDir(data[i])) {
        resarr1.push(data[i])
      }
    }
    console.log(resarr1)
  })


}

async function isDir (path) {
  return new Promise((resolve, reject) => {
    fs.stat('./wwwroot/' + path, function (err, data) {
      if (err) {
        console.log(err)
        reject(err)
        return
      }
      resolve(data.isDirectory())
    })
  })
}

main()




