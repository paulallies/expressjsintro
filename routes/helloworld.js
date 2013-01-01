exports.index = function(req, res){
    res.render("helloworld/index");
};

exports.welcome = function(req, res){
    res.send("This is the Welcome action method...");
};