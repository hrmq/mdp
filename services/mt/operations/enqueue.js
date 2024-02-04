module.exports = function(args) {
    var data;

    data = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"' +
        ' xmlns:xsd="http://www.w3.org/2001/XMLSchema"' +
        ' xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
        'xmlns:exam="http://example" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<exam:enqueue soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
        '<username>' +args.username.$value + '</username>' +
        '<password>' +args.password.$value + '</password>' +
        '<domain>' +args.username.$value + '</domain>' +
        '<msgType>' +args.msgType.$value + '</msgType>' +
        '<messages><item>' +args.messages.$value + '</item></messages>' +
        '<destinations><item>' +args.destinations.$value + '</item></destinations>' +
        '<originators><item>' +args.originators.$value + '</item></originators>' +
        '<udhs><item>' +args.udhs.$value + '</item></udhs>' +
        '<mClass><item>' +args.mClass.$value + '</item></mClass>' +
        '</exam:enqueue>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';
    console.log(data)
    return data;
}
