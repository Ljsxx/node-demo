var http = require("http")
var url = require("url")
var fs = require("fs")
var querystring = require("querystring")
let formidable = require('formidable')
let util = require("util")
http.createServer((req,res)=>{
    if(req.url === '/add'){
        fs.readFile("./pages/add.html",(err,data)=>{
            if(!err){
                res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"})
                res.end(data)
            }
        })
    }else if (req.url !== 'add' && req.method.toUpperCase() === 'GET') {
        let myUrl = url.parse(req.url,true) //对象
        let queryObj = myUrl.query
        // let urlStr = url.parse(req.url) //字符串
        // console.log(urlStr.query)
        // let queryObj = querystring.parse(urlStr.query)
        // console.log(queryObj)
        res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"})
        res.write(JSON.stringify(queryObj))
        res.end("<h1>page-GET</h1>")
    }else if (req.url !== 'add' && req.method.toUpperCase() === 'POST'){
        // 1.实例化对象
        let form = new formidable.IncomingForm()
        
        // 2.设置上传的文件路径
        form.uploadDir = "./uploads/";
        // 3.获取表单的内容
        console.log(req.files)
        form.parse(req,(err,fields,files)=>{
            console.log(files)
            res.writeHead(200,{"Content-type":"text/plain;charset=UTF-8"})
            res.write("received upload:\n\n")
            res.end(util.inspect({fields:fields,files:files}));
        })
    }else {
        res.writeHead(404,{"Content-type":"text/html"})
        res.end("404")
    }
}).listen(8848,"127.0.0.2")