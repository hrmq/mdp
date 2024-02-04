module.exports = function() {
    function ISODate() {
        this.pad = function(n) {
            return n<10 ? '0'+n : n
        }
    }
    ISODate.prototype.now = function() {
        var d = new Date();
        return d.getUTCFullYear()+'-'
            + this.pad(d.getUTCMonth()+1)+'-'
            + this.pad(d.getUTCDate())+'T'
            + this.pad(d.getUTCHours())+':'
            + this.pad(d.getUTCMinutes())+':'
            + this.pad(d.getUTCSeconds())+'Z'
    }

    return new ISODate();
}