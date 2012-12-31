exports.index = function(req, res){
    res.send("This is my <b>default</b> action...");
};

exports.welcome = function(req, res){
	var name = req.query.name,
		numtimes = req.query.numtimes;
    res.send("Hello " + name + ", NumTimes is: " + numtimes);
};