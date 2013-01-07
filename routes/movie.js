var movieRepository = require("../models/movierepository");

var getAllMovies = function(req, res){
	movieRepository.getAll(function(result){
		res.render("movie/index",{
			title: "Move List",
    		movies : result
    	});	
	});   
};

exports.index = getAllMovies;

exports.create = function(req, res){
	
	switch(req.method){
		case "GET":
			res.render("movie/create", { title: "Create"});
			break;

		case "POST":
			var newMovie = {
				title : req.body.title,
				releasedate : req.body.releasedate,
				genre : req.body.genre,
				price : req.body.price 
			};
			movieRepository.create(newMovie, function(){
				getAllMovies(req, res);
			});
			break;

	}

}





