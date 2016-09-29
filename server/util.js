var fs = require('fs');
var multiparty = require('multiparty');

var util = {
    config: {
        PORT: 8090,
        DOMAIN_NAME: 'local.pengxiulin.com'+':8090',
        UPLOAD_DIR: 'files/'
    },
    uploadParser: function(req, res){
        var self = this;
        // 处理POST表单multipart类型上传的库
        var form = new multiparty.Form({
            maxFieldsSize: 1000000000,
            autoFiles: true,
            uploadDir: self.config.UPLOAD_DIR
        });
        form.parse(req, function(err, fields, files) {
            var result = [];
            for(var item in files){
                for(var i = 0; i<files[item].length; i++){
                    var fileItem = files[item][i];
                    var dirname = require('path').dirname(fileItem.path);
                    var filename = dirname +"/"+ fileItem.originalFilename
                    fs.renameSync(fileItem.path, filename);
                    var downloadPath = "http://"+self.config.DOMAIN_NAME+"/"+self.config.UPLOAD_DIR+fileItem.originalFilename;
                    var fileInfo = {
                        name: fileItem.originalFilename,
                        size: fileItem.size,
                        path: downloadPath
                    };
                    result.push(fileInfo);
                }
            }
            var data = JSON.stringify(result);
            data += "\n";
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data, 'utf8')
            });
            res.end(data);
        });
        // Optional parts, for showing uploading progress at server.
        form.on('progress', function(bytesReceived, bytesExpected){
            console.log(parseInt((bytesReceived/bytesExpected)*100) + "%");
        });
    },
    listFiles: function(req, res){
        res.end("incompleted");
    },
    downloadFile: function(req, res, file){
        var filePath = util.config.UPLOAD_DIR + file;
        if(fs.existsSync(filePath)){
            fs.createReadStream(filePath).pipe(res);
        }else{
            res.end("404");
        }
    }
};
module.exports = util;