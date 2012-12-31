exports.index = function(req, res){
    res.send("This is my <b>default</b> action...");
};

exports.welcome = function(req, res){
    res.send("This is the Welcome action method...");
};