module.exports = function(args) {

    var data = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
        '<s:Body>' +
    '<dynamicCharge xmlns="http://ChargingSrv.WebService.mapfa.net" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">' +
        '<username xmlns="">' +args.username.$value + '</username>' +
        '<password xmlns="">' +args.password.$value + '</password>' +
        '<domain xmlns="">' +args.username.$value + '</domain>' +
        '<channel xmlns="">' +args.channel.$value + '</channel>' +
        '<mobilenums xmlns="">' +args.destination.$value + '</mobilenums>'+
        '<serviceIds xmlns="">' +args.serviceid.$value + '</serviceIds>'+
        '<prices xmlns="">' +args.dcs.$value + '</prices>'+
        '<pardisid xmlns="">' +args.pardisid + '</pardisid>'+
        '</dynamicCharge>'+
        '</s:Body>'+
    '</s:Envelope>';

    return data;
}
