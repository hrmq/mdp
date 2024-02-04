module.exports = function(express,config,shortcodeModel,bodyParser) {
    var app = express();

    app.set('port',config.api.port);
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    var boot = require('./bin/boot')(app);


    global.shorcodeModel = shortcodeModel;

    app.listen(app.get('port'),function(){
        console.log('app started')
    })

    return app;
}