module.exports = function(args) {

    if (args.addresses.toString().length !== 12) {
        return 'SVC0004';
    }
    return false;
}