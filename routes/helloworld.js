exports.index = function(req, res){
    res.render("helloworld/index");
};

exports.welcome = function(req, res){
	var name = req.query.name,
		numTimes = req.query.numtimes,
		messageCollection = [];

	for(var i = 0; i < numTimes; i++){
		messageCollection.push({message: "Hello "+ name});
	}

    res.render('helloworld/welcome', { 
        messageCollection: messageCollection
    });
};