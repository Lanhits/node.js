# `NODE` 服务端学习笔记

node.js作为服务端的学习
node.js基于google 的 v8 引擎
大部分笔记来自于 it营 bilibili 视频号 `15978900652272810280`

笔记时间(开始)：20201123

* 用户量大
* `nodejs` 前端必备
* 擅长高并发
* 简单
* 可实现功能多 包括计算平台 游戏开发 区块链开发 及时通讯 跨平台app 桌面应用 云直播 物联网
* 官网：`http://nodejs.cn/`  和  `https://nodejs.org/zh-cn/`

## 基本使用

环境搭建和基本使用：

* 官网下载安装，建议下载稳定版本
* `CMD` 输入指令 `node -v` 出现 版本号即安装成功
* 开发工具推荐 `vscode`
* `vscode` 推荐插件：
  * `chinese` 中文插件(可选)
  * `node snippets` node 提示语句(推荐)
* 控制台直接调试 执行 `node` 指令 控制会直接进入 代码调试环境 类似于浏览器的console环境 但不一样
* 执行 `js` 文件 通过执行 `node 文件名` 执行文件, 注意：
  * 程序目录最好不好有中文或者空格

## `模块`使用和创建

* 关于 `commonjs` ？
`commonjs` 是一个js代码模块化的规范, 在它被提出之前js并没有模块化的API，不能完成语言的标准库，使 `js` 不再是只能写小脚本的程序， `nodejs` 是 `commonjs` 的具体实现， 基于nodejs 可编写以下应用：

  * 服务器端 JavaScript 应用程序
  * 命令执行工具
  * 桌面应用程序

* `模块分类？` 主要分为 `核心模块(系统模块)` 和 `文件模块(自定义模块)`

* `创建模块`
  * 把公共的功能提取出来当做一个模块
  * 单独的文件里使用 `exports` 或 `module.exports` 暴露公共功能的属性放方法
    * 注意： `exports` 是 `module.exports` 的替代品，node 中可以理解为 系统默认加了一句代码：

      ```javascript
        let exports = mudule.exports
        // 也就是说 如果直接改变 `module.exports` 的指向的话 `exports` 变量会直接失去他原有的作用 变成一个普通的变量 如：mudule.exports = {}
      ```

  * 然后就可以引入到其他地方去使用了
  
  ```javascript
    exports.getTrueOrFalse = function (data) {
      return !!data
    }

    // 或者 两者不能共存

    let obj = {
      a: 12313,
      get (e) => {
        return e && 55555
      }
    }

    module.exports = obj
  ```

* `引入模块`: `require('路径')` 如果模块是系统模块或者按默认规则存储的模块可以直接写模块名
  
  ```javascript
    const http = require('http') // 系统模块或按默认规则存储模块写法
    const waibu = require('./waibu.js') // 相对路径写法
    // 变量http waibu 就可以直接使用模块的内容
  ```

  * 自定义模块怎么样才能想系统模块一样直接写名字引入？其实下载的插件也属于自定义模块，但是下载的模块居然可以直接用模块名来引入，也就是说引入模块是有默认地址的即默认仓库！
  * 下载的模块默认存储在 `node_modeles` 目录内(emmm算了这部分不写了到时候想知道自己百度吧)
* 关于 commonjs 对于 `包目录` 的要求：
  * package.json 包描述文件
  * bin 存放可执行二进制文件目录
  * lib 存放 JavaScript 代码目录
  * doc 包文档文件

* 生成一个 `package.json` 运行命令 `npm init --yes`, 使用下载的模块之前需生成这个文件，然后在安装包 `--save` 时 才能记录在 配置文件里面

<br />
<br />
<br />

## `http` 模块
  
`http` 模块主要用于创建服务器并提供服务

```javascript
const http = require('http') // 引入
```

### `http.createServer` 方法

* 回调函数(参数)
  * 回调函数的参数1, 请求信息对象 `request`
    * `request.url` 请求地址，常用语接口的路由区分操作
  * 回调函数的参数2, 响应请求功能对象 `response`
    * `response.setHeader(type, value)` 设置响应头
    * `response.writeHead()`
    * `response.on(type, callback)` 监听
      * type类型 `data` 有可读数据时触发 `end` 接收的数据传输结束时触发
    * `response.write(data)` 发送数据
    * `response.end(data)` 发送数据data 并结束响应
* 返回值：服务器对象 `server`
* 基本用法
  
```javascript
var http = require('http'); // 引入http
http.createServer(function (request, response) { // 创建server request 请求数据对象 response 响应功能对象

  response.writeHead(200, {'Content-Type': 'text/plain'}); // 写入本次响应码为200 ，数据类型为字符串
  response.end('Hello World'); // 发送数据并结束请求
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
```

<br />
<br />
<br />

## `fs` 模块

* `fs.stat` 检测文件还是目录
  * `fs.stat(path, callback)`
  path： 路径
  callback: 回调函数 function(err, data) {}
    * `err` 错误信息
    * `data` 数据对象
      * `data.isFile()` 如果是文件则返回 `true`  否则返回 `false`
      * `data.isDirectory()` 如果是目录则返回 `true` 否则返回 `false`

    ```javascript
    let fs = require('fs')
    fs.stat('./web.md', function(err, data) {
      if (err) {
        console.log(err)
        return
      }
      console.log(`是否为文件: ${data.isFile()},是否为目录${data.isDirectory()}`)
    })

    ```

* `fs.mkdir` 创建目录
  * `fs.mkdir(path, callback)`
    * `path`: 路径 路径只能多写一层 且不能为已存在路径
    * `callback`: 回调函数接收一个参数 err 错误信息

    ```javascript
      fs.mkdir('./css', (err) => {
      if (err) {
        console.log(err)
        return
      }
      console.log('创建目录成功')
    })
    ```

* `fs.writeFile` 创建写入文件

  * `fs.writeFile(path, content, option, callback)`
    * path: 路径，只能在已存在目录创建文件，若文件已存在会直接替换为新文件
    * content：文件内容 `<string> | <Buffer> | <TypedArray> | <DataView>`
    * option: 配置项 可省略
      * encoding: 默认值 `utf8`
      * mode: integer 默认值 `0o666`
      * flag: 默认值 `w`
    * callback: 回调函数 接收一个错误信息

  ```javascript
  // 需要保证 html文件夹 路径存在
    fs.writeFile('./html/index.html', '你好 nodejs!!！', function (err) {
      if (err) {
        console.log(err)
        return
      }
      console.log('创建成功')
    })
  ```

* `fs.appendFile` 追加文件

  * `fs.appendFile(path, content, option, callback)`
  * 参数与 `writeFile` 一致 但是如果文件已存在 则直接在文件后面增加内容

  ```javascript
  // 需要保证 html文件夹 路径存在
    fs.appendFile('./css/index.css', ' h2 {color: red;}', function(err) {
      if (err) {
        console.log(err)
        return
      }
      console.log('创建或追加成功')
    })
  ```

* `fs.readFile` 读取文件

  * `fs.readFile(path, option, callback)`
    * path: 路径 需为已存在路径 若不存在返回错误信息
    * option： 可选 `String | Object` ， String 时 为指定文件编码 Object 时如下
      * encoding：默认 `utf8`
      * flag: 默认 `r`
    * callback(err, data)
      * err: 错误信息
      * data: 读取到的数据 为二进制数据

  ```javascript
    fs.readFile('./html/index.html', function(err, data) {
      if (err) {
        console.log(err)
        return
      }
      console.log(data)
      console.log(data.toString()) // 转字符串
    })
  ```

* `fs.readdir` 读取目录

  * `fs.readdir(path, option, callback)`
    * path: String | Buffer | URL
    * option: 可选 String | Object
    * callback: 回调函数

  ```javascript
    fs.readdir('./', function(err, data) {
      if (err) {
        console.log(err)
        return
      }
      console.log(data) // 得到一个数组
    })
  ```

* `fs.rename` 重命名 功能： 1 表示重命名 2 表示移动文件

  * `fs.rename(oldPath, newPath, callback)`
    * olPath: 旧的路径
    * newPath: 新的路径
    * callback: 回调函数
  * 旧的路径 与 新的路径仅为文件名不一样时表示重命名文件 仅为文件夹名称不一样的表示移动文件 都不一样是表示移动并重命名文件

  ```javascript
    fs.rename('./css/index.css', './css/css/new.css', function (err) {
      if (err) {
        console.log(err)
        return
      }
      console.log('重命名或移动文件成功')
    })
  ```

* `fs.rmdir` 删除目录 不能删除带文件的目录

  * `fs,rmdir(path, option, callback)`
    * path: 路径
    * option：配置对象 详看文档
    * callback：回调函数

  ```javascript
    fs.rmdir('./css/common', function (err) {
      if (err) {
        console.log(err)
        return
      }
      console.log('删除成功')
    })
  ```

* `fs.unlink` 删除文件
  * `fs.unlink(path, callback)`
    * path: 路径
    * callback: 回调函数

  ```javascript
  fs.unlink('./css/css/new.css', function(err) {
    if (err) {
      console.log(err)
      return
    }
    console.log('删除成功')
  })
  ```

* 练习1, 判断服务器上是否有 upload 目录 如果有 不做操作 如果没有新建一个目录 答案代码： `fsTest/test1.js`  使用 `mkdirp` 插件更方便(属于 外部插件需要安装)
* 练习2, 在wwwroot 文件夹中 有images css js index.html, 找出文件夹里面的所有目录， 并存放于一个数组中。答案代码: `fsTest/test2.js`

<br />
<br />
<br />

## `url` 模块

使用：

```javascript
  const url = require('url')
  let api = 'http://192.168.0.1:8000/login/?name="zhangsan"&age="18"'
  let res = url.parse(api)
  // {
  //   protocol: 'http:',
  //   slashes: true,
  //   auth: null,
  //   host: '192.168..1:8000',
  //   port: '8000',
  //   hostname: '192.168..1',
  //   hash: null,
  //   search: '?nsme=%22131%22',
  //   query: 'nsme=%22131%22',
  //   pathname: '/login/',
  //   path: '/login/?nsme=%22131%22',
  //   href: 'http://192.168..1:8000/login/?nsme=%22131%22'
  // }

  let res1 = url.parse(api, true) // 第二个参数为true 时会吧地址带过来的参数 格式化成对象(键值对)的形式

  // {
  //   protocol: 'http:',
  //   slashes: true,
  //   auth: null,
  //   host: '192.168..1:8000',
  //   port: '8000',
  //   hostname: '192.168..1',
  //   hash: null,
  //   search: '?nsme=%22131%22',
  //   query: [Object: null prototype] { nsme: '"131"' },
  //   pathname: '/login/',
  //   path: '/login/?nsme=%22131%22',
  //   href: 'http://192.168..1:8000/login/?nsme=%22131%22'
  // }
  
```

## `supervisor` 服务器自重启动插件

* 用于node.js 服务器的自重启动
* 监听到文件变化后重启
* 安装 全局安装一次 `npm install supervisor -g`
* 使用 执行 `supervisor 文件名.js`
