const http = require("http")
const url = require("url")
const fs = require("fs")
let querystring = require("querystring")
const formidable = require("formidable")
http.createServer((req,res)=>{
    if(req.url === '/add'){
        fs.readFile("./pages/add.html",(err,data)=>{
            if(!err){
                res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"})
                res.end(data)
            }
        })
    }else if (req.url !== 'add' &&　req.method.toUpperCase() === 'GET') {
        res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"})
        let myUrl = url.parse(req.url,true) //对象
        console.log(myUrl)
        let query = myUrl.query
        console.log(query)
        res.write(JSON.stringify(query))
        res.end("<h1>page-get</h1>")
    }else if (req.url !== 'add' && req.method.toUpperCase() === 'POST') {
        res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'})
        //1.变量
        let allData = ''
        //2.接受小段数据
        req.on("data",(buf)=>{
            console.log(typeof buf)
            allData += buf
        })
        //3.所有的数据传递完毕
        req.once("end",()=>{
            console.log(allData)
            let dataObj = querystring.parse(allData)
            console.log(dataObj)
            res.end("OK!")
        })
    }
}).listen(8848,"127.0.0.2")