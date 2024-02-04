module.exports = {
    redisHost:'localhost',
    api : {
        port : 3000
    },
    mo : {
        port : 80,
        redirect_url :'http://188.253.2.235/~gateway/wsdl/onMO/gateway.php'
    },
    mt : {
        wsdl : {
            file : 'soap/atieh.wsdl',
            port : 2030,
            path : '/sdp/mt'
        },
        out : {
            host : '10.20.11.200',
            method : 'POST',
            port : 80,
            path : '/websrv/services/SMS?wsdl',
            headers : {
                'Content-Type' : 'text/xml; charset=utf-8',
                'SOAPAction' : 'http://10.20.11.200/websrv/services/SMS'
            }
        } ,
        charge : {
            host : '10.20.11.200',
            method : 'POST',
            port : 80,
            path : '/Charging/services/Charging?wsdl',
            headers : {
                'Content-Type' : 'text/xml; charset=utf-8',
                'SOAPAction' : 'http://10.20.11.200:80/Charging/services/Charging'
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