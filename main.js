let http = require('http')
let fs = require('fs')
let url = require('url')

let tools = require('./common/tools')

http.createServer(function (req, res) {
  console.log(req.url)
  // console.log(url.parse(req.url))

  //设置允许跨域的域名，*代表允许任意域名跨域
  res.setHeader("Access-Control-Allow-Origin","*");
  //跨域允许的header类型
  res.setHeader("Access-Control-Allow-Headers","Content-type,Content-Length,Authorization,Accept,X-Requested-Width");
  //跨域允许的请求方式
  res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  //设置响应头信息
  res.setHeader("X-Powered-By",' 3.2.1')
  //让options请求快速返回
  if (req.url === '/login/login') {
    console.log(21313)
    res.writeHead('Content-Type', 'application/json;charset=UTF-8')
    let data = {
      code: 200,
      msg: '登录成功',
      key: '2131s1f5s13211111f'
    }
    req.on('data',(data) => {
      console.log(data.toString())
    })
    res.end(JSON.stringify(data))
  } else if(req.url === '/') {
    fs.readFile('./dist/index.html', function (err, data) {
      console.log('56456')
      res.end(data)
    })
  }
  else if (req.url.indexOf('/袜子' === 0)) {
    fs.readFile('./袜子.png', function(eer, data) {
      // console.log('data', data)
      res.end(data)
    })
  }
  else if (req.url.indexOf('/static') === 0){
    fs.readFile('./dist/' + req.url.replace('/static', ''), function (err, data) {
      res.end(data)
    })
  } 
}).listen(3001, function () {
  console.log('running at http://127.0.0.1:3001')
  tools.test()
})



