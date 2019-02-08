console.log('start')
let str = '012'
let buf = Buffer.from(str)
console.log(buf)
console.log(buf.length)
let buf2 = Buffer.alloc(10)
buf2[0] = 9
buf2[1] = 10
buf2[2] = 11
buf2[9] = 0xfa
buf2[11] = 6
console.log(buf2)