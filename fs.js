// 同步
// 1.引入模块
const fs = require('fs')
// 2.打开文件
let fd = fs.openSync('./node2.txt','w')
// 3.写入内容
fs.writeFileSync(fd, 'hello tree node2')
// 4.保持并退出
fs.closeSync(fd)


// 异步   
// 1.引入模块
// 2.打开文件
fs.open('./fs.txt','a+',(err,fd)=>{
    // 2.1判断是否出错
    if(!err){
        // 2.2 写入文件
        fs.writeFile(fd, 'this is a file-->', (err2)=>{
            // 2.3 写入成功
            if(!err2){
                console.log('文件写入成功')
            }else {
                console.log('写入失败')
                throw err2;
            }
            // 2.4读取文件
            fs.readFile(fd,(err3,res)=>{
                if(!err3){
                    console.log('读取数据：',res.toString())

                    // 2.5关闭文件
                    fs.close(fd, (err3)=>{
                        if(!err3){
                            console.log('文件关闭')
                        }else {
                            console.log('关闭失败')
                            throw err3
                        }
                    })
                }else{
                    throw err3
                }
            })
        })
    }else {
        console.log('打开失败')
        throw err;
    }
})

// 创建写入流
// 1.引入模块
// 2.创建写入流
let ws = fs.createWriteStream('./fs.txt')
// 3.打开通道
ws.once("open",()=>{
    console.log("通道已经打开")
})
ws.once("close",()=>{
    console.log("通道已经关闭")
})
// 4.写入内容
ws.write("hello")
ws.write("trey")
ws.write('ok')
// 5.关闭通道
ws.end()


// 读取文件
// 1.读取图片
fs.readFile("C:/Users/Trey/Desktop/360截图20150914174326792.jpg",(err,data)=>{
    // 2判断
    if(!err){
        // 3.写入图片文件
        fs.writeFile('pic1.jpg',data,(err)=>{
            if(!err){
                console.log('图片写入成功')
            }else {
                throw err;
            }
        })
    }else {
        throw err;
    }
})



// 创建读入流
// 1.引入模块
// 2.创建读入流、写入流
let rs1 = fs.createReadStream("C:/Users/Trey/Desktop/QQ图片20170120233634.png")
let ws1 = fs.createWriteStream("pic2.jpg")
// 3.监听流的打开和关闭
ws1.once("open", ()=>{
    console.log('ws1 通道已经打开')
})
ws1.once("close",()=>{
    console.log('ws1 通道已经关闭')
})
rs1.once('open',()=>{
    console.log('rs1 通道打开')
})
rs1.once('close',()=>{
    console.log('rs1 通道关闭')
})
// 4.绑定data
rs1.on('data',(data)=>{
    // console.log(data)
    ws1.write(data)
})




// 创建管道
// 1.引入模块
// 2.创建读入流、写入流
let rs2 = fs.createReadStream("C:/Users/Trey/Desktop/color.jpg")
let ws2 = fs.createWriteStream("pic3.jpg")
rs2.pipe(ws2)










console.log('end')