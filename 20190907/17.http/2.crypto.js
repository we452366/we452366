const crypto = require('crypto');

// 摘要算法 md5 不可逆
// md5特点 1） 不可逆 
// 2)相同内容摘要的结果相同,有一点不同出来的结果完全不同 
// 3) 摘要的结果长度相同


// let r = crypto.createHash('md5').update('123').update('456').digest('base64');
// console.log(r);

// r = crypto.createHash('md5').update(r).digest('base64');
// console.log(r);

// sha1 sha256 加盐算法


let r = crypto.createHmac('sha1','ke1').update('123456').digest('base64')
console.log(r);