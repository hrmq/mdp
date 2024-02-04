module.exports.shortcode = [{
    method: 'get',
    path: '/shortcode/:shortcode/:info',
    render: function (req,res) {
        try {
            var info = JSON.parse(req.params.info);
            shorcodeModel.save(req.params.shortcode,info);

            console.log(info,'OK');
            res.end('OK');
        } catch (e) {
            console.log(req.params,'NOK')
            res.end('Not OK');
        }
    }
}]