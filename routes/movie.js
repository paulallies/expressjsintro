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
	res.render("movie/create", { title: "Create"});
}

exports.add  = function(req, res){
	var newMovie = {
		title : req.body.title,
		releasedate : req.body.releasedate,
		genre : req.body.genre,
		price : req.body.price, 
		rating: req.body.rating
	};

	movieRepository.create(newMovie, function(){
		res.redirect("movies")
	});
}

exports.details = function(req, res){
	movieRepository.getMovie(req.params.id, function(movie){
		res.render("movie/details", { title: "Details", movie : movie});
	});
}

exports.delete = function(req, res){
	movieRepository.delete(req.params.id, function(){
		res.redirect("movies");		
	});
}

exports.edit = function(req, res){
	movieRepository.getMovie(req.params.id, function(movie){
		res.render("movie/edit", { title: "Edit", movie : movie});
	});
}





