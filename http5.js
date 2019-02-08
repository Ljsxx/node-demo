let http = require("http")
let url = require("url")
let fs = require("fs")
let path = require("path")
/*
http.createServer((req,res)=>{
    // 1.获取地址
    let myUrl = url.parse(req.url)
    console.log(myUrl)
    let pathName = myUrl.pathname
    // 2.获取后缀
    let extName = path.extname(pathName)
    // 3.判断加载文件类型
    let filePath = ''
    if(extName.indexOf(".")!==-1){
        filePath = "./" + path.normalize(pathName)
        fs.readFile(filePath,(err,data)=>{
            if(!err){
                let fileType = extName.substr(1)
                fs.readFile(filePath,(err,data)=>{
                    if(!err){
                        res.writeHead(200,{"content-type":"text/"+fileType+";charset=UTF-8"})
                        res.end(data)
                    }
                })
                // res.end("source ok")
            }else {
                res.end("source Not found")
            }
        })
    }else {
        if (path.normalize(pathName)==='' ||　path.normalize(pathName)==='/' || path.normalize(pathName) === '\\') {
            filePath  = './pages/index.html'
        }else {
            filePath = "./pages" + path.normalize(pathName) + '.html'
        } 
        console.log(filePath)
        fs.readFile(filePath,(err,data)=>{
            if(!err){
                res.writeHead(200,{"content-type":"text/html;charset=UTF-8"})
                res.end(data)
            }else {
                res.writeHead(404,{"content-type":"text/html;charset=UTF-8"})
                res.end("404 NOT FOUND")
            }
        })
    }
    // res.writeHead(200,"")
    // res.end("ok!")
}).listen(8848,"127.0.0.2")

*/


http.createServer((req,res)=>{
    // 1.获取url地址
    let pathUrl = url.parse(req.url)
    let pathName = pathUrl.pathname
    if(pathName==='' || pathName==="/" || pathName==="\\"){
        pathName = "index"
    }

    // 2.处理路径
    if(pathName.lastIndexOf(".")===-1){
        pathName = './statics/pages/' + pathName + '.html'
    }else {
        pathName = './statics/' + pathName
    }
    // 3.拼接路径
    let fileUrl = "./" + path.normalize(pathName)

    // 4.读取文件
    console.log("fileUrl--> ",fileUrl)
    fs.readFile(fileUrl,(err,data)=>{
        if(err){
            // 4.1没有找到
            res.writeHead(404,{"content-type":"text/html;charset=UTF-8"})
            res.end("<h1>404,当前页面不存在</h1>")
        }else {
            // 获取后缀
            let extName = path.extname(pathName)
            // 4.2.找到
            getContentType(extName,(contentType)=>{
                res.writeHead(200,{"content-type":contentType+";charset=UTF-8"})
                res.end(data)
            })
        }
    })
}).listen(8848,"127.0.0.2")

function getContentType(extName,callBack){
    // 1.读取文件
    fs.readFile("./mime.json",(err,data)=>{
        if(err){
            throw err
            return
        }
        let mimeJson = JSON.parse(data)
        let contentType = mimeJson[extName] || "text/plain"
        callBack(contentType)
    })
}