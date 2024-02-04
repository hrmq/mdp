module.exports = function(async,http,config,ltx) {
    function Queue() {
        this.concurrency = 1000;

        this.queue = async.queue(function(task,callback,cb){

            switch (task.name) {
                case 'send' :
                    var req = http.request(task.options,function(res){
                        var rst = '';
                        res.on('data',function(result){
                            rst += result.toString();
                        });

                        res.on('end',function(){
                            try {
                                var response = (ltx.parse(rst)).children[1].children[1].children[1].children[1].getText()
                                //LOGGER.disk.dr(task.options.headers.ServiceKey,response)
                                LOGGER.info('PARDIS RSP ==> ', response);
                                cb(response)
                            } catch (e) {
                                LOGGER.error('PARDIS response error ==>', e.message, e.stack)
                            }
                        })

                        res.on('error',function(err){
                            LOGGER.error(err)
                            callback(err)
                        })
                    });
                    req.write(task.message);
                    req.end();
                    callback()
                    break;
                case 'chargeAmount' :

                    var req = http.request(task.options, function (res) {
                        var rst = '';

                        console.log(res.headers);
                        res.on('data',function(result){
                            rst += result.toString();
                        });

                        res.on('end',function(){
                            console.log(rst)
                        })

                        res.on('error',function(err){
                            LOGGER.error(err)
                            callback(err)
                        })
                    });
                    req.write(task.message);
                    req.end();
                    callback()
                    break;
            }

        },this.concurrency)
    }

    Queue.prototype.send = function(options,message) {
        LOGGER.info('task queue length is:',this.queue.running());

        this.queue.push({name : 'send' , options:options, message :message},function(err){
            LOGGER.debug('task send completed with this options %s and message %s',options,message)
        })
    };

    Queue.prototype.chargeAmount = function (options,message) {
        LOGGER.info('task queue length is:',this.queue.running());
        console.log(options,'aaa')

        this.queue.push({name : 'chargeAmount' , options:options, message :message},function(err){
            LOGGER.debug('task amount charging completed with this options %s and message %s',options,message)
        })
    }

    return new Queue();
}