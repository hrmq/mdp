var serviceSend = require('./operations/serviceSend');
var enqueue = require('./operations/enqueue');
var serviceCharge  = require('./operations/serviceCharge');
var confirmCharge  = require('./operations/confirmCharge');
var validation = require('./operations/validation');
var http = require('http');
var ltx = require('../../bin/node_modules/ltx');

var accounts = [];
accounts['ngopr1'] = 'test';
accounts['ngopr2'] = 'test';

module.exports = function(config,queue,model,fiber) {

    function myService (queue) {
        this.queue = queue;
    }

    myService.prototype.export = function() {
        var self = this;
        return {
            AtiehPardisService: {
                SMSPort: {
                    ServiceSend : function(args,callback){
                        fiber(function () {

                            //LOGGER.disk.mt(args);

                            if (accounts[args.username.$value] == 'test') {


                                model.save(args.username.$value,args) ;

                                var username = args.username.$value;
                                args.username.$value = 'ngopr1';

                                var req = http.request(config.mt.out,function(res){
                                    var rst = '';
                                    res.on('data',function(result){
                                        rst += result.toString();
                                    });

                                    res.on('end',function(){
                                        try {
                                            //var response = (ltx.parse(rst)).children[1].children[1].children[1].children[1].getText()
                                            var response = rst.match(/<ServiceSendReturn xsi:type="xsd:long">(.*)<\/ServiceSendReturn>/g);
                                            var response = response[0].replace(/\D+/g,'')

                                            //LOGGER.disk.dr(task.options.headers.ServiceKey,response)
                                            LOGGER.info('PARDIS RSP (' + username + ') ==>', args.destinations.$value, response);
                                            //LOGGER.disk.count();
                                            callback( {result : response})
                                        } catch (e) {
                                            LOGGER.error('PARDIS response error ==>', e.message, e.stack)
                                        }
                                    })

                                    res.on('error',function(err){
                                        LOGGER.error(err)
                                        callback(err)
                                    })
                                });
                                req.write(serviceSend(args));
                                req.end();
                            }

                        }).run()
                    } ,
                    enqueue : function(args,callback) {
                        fiber(function () {

                            var req = http.request(config.mt.out,function(res){
                                var rst = '';
                                res.on('data',function(result){
                                    rst += result.toString();
                                });

                                res.on('end',function(){
                                    try {
                                        var response = (ltx.parse(rst)).children[1].children[1].children[1].children[1].getText()
                                        //LOGGER.disk.dr(task.options.headers.ServiceKey,response)
                                        LOGGER.info('PARDIS ENQ RSP ==> ', response);
                                        callback( {result : response})
                                    } catch (e) {
                                        LOGGER.error('PARDIS ENQ response error ==>', e.message, e.stack)
                                    }
                                })

                                res.on('error',function(err){
                                    LOGGER.error(err)
                                    callback(err)
                                })
                            });
                            req.write(enqueue(args));
                            req.end();

                        }).run()
                    } ,
                    ServiceCharge : function(args,callback) {
                        fiber(function () {
                            var req = http.request(config.mt.charge,function(res){
                                var rst = '';
                                res.on('data',function(result){
                                    rst += result.toString();
                                });

                                res.on('end',function(){
                                    try {
                                        console.log(rst);
                                        var response  = (ltx.parse(rst)).children[0].children[0].children[0].children[0];

console.log('LENGTH =>',response.length);
console.log(response);
                                        +console.log(response.length,'jfds;')
                                        /*if (response.length > 2) {
                                         var confirmReq = http.request(config.mt.charge, function (confirmRes) {
                                                var rst2 = '';
                                                confirmRes.on('data', function (result2) {
                                                    rst2 += result2.toString();
                                                })

                                                confirmRes.on('end' , function() {
                                                    console.log(rst2)
                                                    var response2 = (ltx.parse(rst2).children[0].children[0].children[0].children[0])
                                                    //console.log(response2,'das');
                                                    callback({result:response2})
                                                    LOGGER.info('PARDIS CONFIRM CHARGE RSP ==> ', rst2);
                                                })
                                            })

                                            args.pardisid = response;
                                            console.log(confirmCharge(args))
                                            confirmReq.write(confirmCharge(args));
                                            confirmReq.end();
                                        } else {

                                             LOGGER.info('PARDIDS CHARGE RSP ==>',reponse);
                                             callback({result : response })
                                        }*/
                                        LOGGER.info('PARDIS CHARGE RSP ==> ', response);
                                        //callback( {result : response})
                                    } catch (e) {
                                        LOGGER.error('PARDIS CHARGE response error ==>', e.message, e.stack);
                                        callback({result : 'PARDIS CHARGE RESPONSE ERROR'})
                                    }
                                })

                                res.on('error',function(err){
                                    LOGGER.error(err)
                                    callback(err)
                                })
                            });
                            req.write(serviceCharge(args));
                            req.end();

                        }).run()
                    }
                }
            }
        }
    }

    var service = new myService(queue)
    return service.export();
}