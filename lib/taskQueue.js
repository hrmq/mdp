module.exports = function() {
    function TaskQueue() {
        this.concurrency = 50;
        this.running = 0;
        this.queue = [];
    }

    TaskQueue.prototype.pushTask = function(task,callback) {
        this.queue.push(task);
        this.next();
    }

    TaskQueue.prototype.next = function() {
        var self = this;
        while (self.running < self.concurrency && self.queue.length) {
            var task = self.queue.shift();
            task(function(err){
                self.running--;
                self.next()
            });
            self.running ++;
        }
    }

    return new TaskQueue();
}