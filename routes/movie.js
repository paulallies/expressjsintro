var movieRepository = require("../models/movierepository");

exports.index = function(req, res){
	movieRepository.getAll(function(result){
		res.render("movie/index",{
    		movies : result
    	});	
	});   
};





