var srvLoc = require('./container')();

module.exports = function() {
    var fs = require('fs');
    var paths = [ 'services/','models/' ]

    var lib = fs.readdirSync('./lib');
    lib.forEach(function(item) {
        var name = item.split('.')[0];
        srvLoc.factory(name,require('../lib/'+name))
    });
    console.log( 'lib modules initiated');

    paths.forEach(function(path){
        var modules = fs.readdirSync(path);
        modules.forEach(function(mod){
            var meta = JSON.parse(fs.readFileSync(path+mod+'/package.json'));
            srvLoc.factory(meta.name,require('../'+path+mod+'/index.js'));
        })
        console.log( path +' modules initiated');
    });

    global.LOGGER = srvLoc.get('logger');

    return srvLoc;
}


