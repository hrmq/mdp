module.exports = function(app) {
    var fs = require('fs');
    var path = require('path');

    var routes = fs.readdirSync(path.join(__dirname,'../routes'));

    routes.forEach(function(route) {
        var uri = require(path.join(__dirname,'../routes/'+route));

        for (var i in uri) {
            uri[i].forEach(function(page){
                app[page.method](page.path,page.render)
            })
        }

    })
}