var movieRepository = require("../models/movierepository");

exports.index = function(req, res){
	movieRepository.getAll(function(result){
		res.render("movie/index",{
			title: "Move List",
    		movies : result
    	});	
	});   
};

exports.create = function(req, res){
	if(req.method == "GET"){
		res.render("movie/create", { title: "Create"});
	}
}





