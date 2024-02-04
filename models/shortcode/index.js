module.exports = function(db) {
    function SHModel() {
        this.db = db;
        this.prefix = 'cfg:'
    }

    SHModel.prototype.save = function(user,args) {
        db.hmset(this.prefix + user , args)
    }

    SHModel.prototype.getMO = function(shortcode,cb) {
        db.hget(this.prefix + shortcode,'mo',function(err,result){
            cb(result)
        })
    }

    SHModel.prototype.getDR = function(shortcode,cb) {
        db.hget(this.prefix + shortcode,'dr',function(err,result){
            cb(result)
        })
    }

    SHModel.prototype.getMOLog = function(shortcode,cb) {
        db.lrange(shortcode + ':mo',0,-1,function(err,result){
            cb(result)
        })
    }

    SHModel.prototype.getMTLog = function(shortcode,cb) {
        db.lrange(shortcode + ':mt',0,-1,function(err,result){
            cb(result)
        })
    };

    SHModel.prototype.getSubscriberMOLog = function(number,cb) {
        db.lrange('mo:'+number,0,-1,function(err,result){
            cb(result)
        })
    }

    SHModel.prototype.getSubscriberMTLog = function(number,cb) {
        db.lrange('mt:'+number,0,-1,function(err,result){
            cb(result)
        })
    }

    SHModel.prototype.isServiceDefined = function(service,cb) {
        db.hexists(this.prefix + 'srv' , service , function (err,res) {
            cb(res);
        });
    }

    return new SHModel();
}