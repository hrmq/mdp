module.exports = function() {
    var env = process.env.NODE_ENV;

    switch (env) {
        case  'development' :
            var dev = require('../config/' + env);
            return dev;
            break;
        case 'production' :
            var dev = require('../config/' + env);
            return dev;
            break;
        default :
            var dev = require('../config/development');
            console.log('No variable environment set, default is initiated');
            return dev;
    }
};
