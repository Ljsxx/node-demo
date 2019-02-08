// 1.引入模块
const http = require("http")
const fs = require("fs")

// 2.创建服务器
let server = http.createServer((req,res)=>{
    // res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"})
    // res.writeHead(200,{"Content-type":"text/plain;charset=UTF-8"})
    if(req.url === '/lists'){
        fs.readFile("./pages/lists.html",(err,data)=>{
            if(!err){
                res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"})
                res.write(data)
                res.write(req.url)
                res.end()
            }else{
                throw err
            }
        })
    }else if (req.url === '/css/index.css') {
        fs.readFile("./css/index.css",(err,data)=>{
            if(!err){
                res.writeHead(200,{"Content-type":"text/css"})
                res.write(data)
                res.end()
            }else {
                throw err
            }
        })
    }else if (req.url === '/images/color.jpg') {
        fs.readFile("./images/color.jpg",(err,data)=>{
            if(!err){
                res.writeHead(200,{"Content-type":"images/*"})
                res.write(data)
                res.end()
            }else {
                throw err
            }
        })
    }else if (req.url === '/source/01.mp4') {
        fs.readFile("./source/01.mp4",(err,data)=>{
            if(!err){
                res.writeHead(200,{"Content-type":"video/mpeg4"})
                // res.write(data)
                res.end(data)
            }else {
                throw err
            }
        })
    }else if (req.url === '/detail') {
        fs.readFile("./pages/detail.html",(err,data)=>{
            if(!err){
                res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"})
                res.write(data)
                res.end()
            }else {
                throw err
            }
        })
    }else if (req.url === '/') {
        fs.readFile("./pages/index.html",(err,data)=>{
            if(!err){
                res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"})
                res.write(data)
                res.write(req.url)
                res.end()
            }else {
                throw err
            }
        })
    }else {
        fs.readFile("./pages/error.html",(err,data)=>{
            if(!err){
                res.writeHead(404,{"Content-type":"text/html;charset=UTF-8"})
                res.write(data)
                res.write(req.url)
                res.end()
            }else {
                throw err
            }
        })  
    }
    // res.write("<h1>哈哈哈</h1>")
    // res.end()
})

// 3.监听
server.listen(8848,"127.0.0.2")




























