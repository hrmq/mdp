module.exports = function(db) {
    function LogModel() {
        this.db = db;
        this.prefix = {
            mt : ':mt',
            userMt : 'mt:',
            mo: ':mo',
            userMo : 'mo:',
            dr : 'dr:',
            count: 'rpt:mt'
        }
    }

    LogModel.prototype.mt = function(args) {
        args.date = (new Date()).valueOf();
        var message = JSON.stringify(args);
        db.lpush(args.senderName + this.prefix.mt , message);
        db.lpush( this.prefix.userMt + args.addresses, message)
    };

    LogModel.prototype.mo = function(args) {
        args.date = (new Date()).valueOf();
        var message = JSON.stringify(args);
        db.lpush(args.to + this.prefix.mo , message );
        db.lpush(this.prefix.userMo + args.from , message)
    }
    
    LogModel.prototype.dr = function (sk,dr) {
        db.lpush(this.prefix.dr + sk , dr);
    }

    LogModel.prototype.count = function () {
        db.incr(this.prefix.count)
    }

    return new LogModel();
}