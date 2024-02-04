
var redis = require('../bin/node_modules/redis');

module.exports = function(config) {

    var client = redis.createClient(6379,config.redisHost,{no_ready_check:true});

    client.on('connect',function(){
        console.log('Connected to Redis');
    });

    return client;
}