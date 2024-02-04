var query = require('querystring')

module.exports = function(express,config,shortcodeModel,bodyParser,http) {
    var app = express();

    app.set('port',config.mo.port);
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());


    app.get('/sdp/mo/', function (req, res) {

        //LOGGER.disk.mo(req.query);
        console.log('req.header',req.headers);
        console.log('req.quiery',query.stringify(req.query));

        var options = {
            host: '188.253.2.235',
            port: 80,
            //path: '/~gateway/wsdl/onMO/gateway.php?' + query.stringify(req.query),
            path: '/~mci8877/ServiceRepository/8877/Recive.php?' + query.stringify(req.query),
            method: 'GET',
            headers: req.headers
        };

        var x = http.request(options,function(res){
            console.log("Connected");
            res.on('data',function(data){
                console.log(data.toString());
            });
        });

        x.end();

        /*http.get(config.mo.redirect_url + '?' +query.stringify(req.query), {headers : req.headers} ,function(res){
            LOGGER.info('RCV ==> from=%s , to=%s ,content= %s' ,
                req.query.from,req.query.to,decodeURIComponent(req.query.content));
            res.resume();
        }).on('error',function(error){
            LOGGER.error(error.message,'can not connect to mo service');
            //TODO : send log report to admin panel
        })*/


        res.end()
    })

    app.listen(app.get('port'),function(){
        LOGGER.info("MO started at port ==> ", app.get('port'));
    })

    return app;
}