var multiparty = require('multiparty');

var methods = {
    uploadParser: function(req, res){
        // 处理POST表单multipart类型上传的库
        var form = new multiparty.Form({
            maxFieldsSize: 1000000000,
            autoFiles: true,
            uploadDir: "./files/"
        });
        form.parse(req, function(err, fields, files) {
            var result = [];
            for(var item in files){
                for(var i = 0; i<files[item].length; i++){
                    var fileItem = files[item][i];
                    var fileInfo = {
                        name: fileItem.originalFilename,
                        size: fileItem.size,
                        path: fileItem.path
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
    }
};
module.exports = methods;