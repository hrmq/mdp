module.exports = function(bunyan,bunyanPretty,config,logModel) {

    config.logger.streams.forEach(function(stream){
        if (stream.name == 'stdout' || stream.name == 'stderr') {
            stream.stream = bunyanPretty()
        }
    })

    var logger = bunyan.createLogger(config.logger);

    logger.disk = logModel;
    return logger
}