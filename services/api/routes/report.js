module.exports.report = [{
        method: 'get',
        path: '/report/shortcode/:num/:type',
        render: function (req,res) {

            switch (req.params.type) {
                case 'mo':
                    shorcodeModel.getMOLog(req.params.num,function(result){
                        res.end(JSON.stringify(result));
                    })
                    break;
                case 'mt':
                    shorcodeModel.getMTLog(req.params.num,function(result){
                        res.end(JSON.stringify(result));
                    })
                    break;
            }

        }
},{
    method: 'get',
    path: '/report/subscriber/:num/:type',
    render: function (req,res) {

        switch (req.params.type) {
            case 'mo':
                shorcodeModel.getSubscriberMOLog(req.params.num,function(result){
                    res.end(JSON.stringify(result));
                })
                break;
            case 'mt':
                shorcodeModel.getSubscriberMTLog(req.params.num,function(result){
                    res.end(JSON.stringify(result));
                })
                break;
        }

    }
}]