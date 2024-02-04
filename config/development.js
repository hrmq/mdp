module.exports = {
    redisHost:'localhost',
    api : {
        port : 3000
    },
    mo : {
        port : 2020,
        redirect_url :'http://188.253.2.235/~gateway/wsdl/onMO/gateway.php'
    },
    mt : {
        wsdl : {
            file : 'soap/atieh.wsdl',
            port : 2030,
            path : '/sdp/mt'
        } ,
        out : {
            host : 'localhost',
            method : 'POST',
            port : 8085,
            path : '',
            headers : {
                'Content-Type' : 'text/xml; charset=utf-8'
            }
        } ,
        charge : {
            host : 'localhost',
            method : 'POST',
            port : 8080,
            path : '/charging',
            headers : {
                'Content-Type' : 'text/xml; charset=utf-8'
            }
        }
    },
    logger : {
        name: 'wsdl-server',
        streams: [
            {
                name: 'stdout',
                stream: process.stdout,
                level: 'info'
            },
            {
                name: 'stderr',
                stream: process.stderr
            }
        ]
    }
}
