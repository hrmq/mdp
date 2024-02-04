module.exports = function(args) {
    var data;

    data = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:exam="http://example" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
        '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<exam:ServiceSend soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
        '<username xsi:type="xsd:string">' +args.username.$value + '</username>' +
    '<password xsi:type="xsd:string">'+ args.password.$value +'</password>' +
    '<domain xsi:type="xsd:string">'+ args.username.$value +'</domain>' +
    '<messages xsi:type="exam:ArrayOf_xsd_string" soapenc:arrayType="xsd:string[]"><item>'+args.messages.$value+'</item></messages>' +
        '<destinations xsi:type="exam:ArrayOf_xsd_string" soapenc:arrayType="xsd:string[]"><item>'+args.destinations.$value+'</item></destinations>' +
        '<originators xsi:type="exam:ArrayOf_xsd_string" soapenc:arrayType="xsd:string[]"><item>'+args.originators.$value+'</item></originators>' +
        '<serviceid xsi:type="exam:ArrayOf_xsd_string" soapenc:arrayType="xsd:string[]"><item>'+args.serviceid.$value+'</item></serviceid>' +
        '</exam:ServiceSend>' +
    '</soapenv:Body>'+
    '</soapenv:Envelope>';

    return data;
}
