let http = require('http');
let fs = require('fs');
let util = require('./util')

http.createServer((req, res) =>{
    if(req.method === "POST"){
        util.uploadParser(req, res);
    }else if(req.method === "GET"){
        var regex = /\/files\/(.*)$/;
        if(regex.test(req.url)){
            // 文件下载
            var matchResult = req.url.match(regex);
            if(matchResult.length>1){
                var filename = matchResult[1];
                if(filename === ""){
                    return util.listFiles(req, res);
                }else{
                    return util.downloadFile(req, res, filename);
                }
            }
            res.end();
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
}).listen(util.config.PORT);
console.log(`listen on http://${util.config.DOMAIN_NAME}/`);
