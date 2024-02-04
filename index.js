var srvLoc = require('./bin/load')();

srvLoc.get('moService');
srvLoc.get('mtService');
srvLoc.get('api');

process.on('uncaughtException', function (err) {
    LOGGER.error('UncaughtException',err.message,err.stack);
});