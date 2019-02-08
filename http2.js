const http = require('http');
const url = require('url')
http.createServer((req,res)=>{
    let myUrl = url.parse(req.url)
    console.log(myUrl)
    res.end("hello world1")
}).listen(8848,"127.0.0.2");

// // // or
// const http = require("http");
// const {URL} = require("url");

// http.createServer((req,res)=>{
//     // 必须是完整地址(http://xx)  req.url
//     // let myUrl = new URL(req.url) // 报错
//     let myUrl = new URL("https://www.baidu.com/search?query=hhh")
//     console.log(myUrl)
//     res.end("hello world2")
// }).listen(8848,"127.0.0.2")






















