let http = require('http');
let fs = require('fs');
let util = require('./util')

const PORT = 8090;

http.createServer((req, res) =>{
    if(req.method === "POST"){
        util.uploadParser(req, res);
    }else if(req.method === "GET"){
        if(false){
            // 文件展示
        }else if(true){
            // 展示上传页面
            let htmlContent = fs.readFileSync("./server/index.html");
            var data = htmlContent;
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf8',
                'Content-Length': Buffer.byteLength(data, 'utf8')
            });
            res.end(data);
        }
    }else{
        console.log(req.method);// HEAD, OPTION or other methods
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf8'
        });
        res.end('');
    }
}).listen(PORT);
console.log("listen on http://local.pengxiulin.com:8090/");
