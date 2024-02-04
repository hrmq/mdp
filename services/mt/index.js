module.exports = function(soap,http,fs,config,jobQueueService,shortcodeModel,fiber) {

    function MT() {
        var wsdl = fs.readFileSync('assets/'+config.mt.wsdl.file,'utf8');

        var server = http.createServer(function(req,res){
            res.end("404: Not Found:" +  req.uri)
        });

        var service = require('./service')(config,jobQueueService,shortcodeModel,fiber);

        server.listen(config.mt.wsdl.port);

        soap.listen(server,config.mt.wsdl.path,service,wsdl);

    }
    return new MT();
}