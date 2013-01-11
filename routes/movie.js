var movieRepository = require("../models/movierepository");

exports.index = function(req, res){
	movieRepository.getAll(function(result){
		res.render("movie/index",{
			title: "Movie List",
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

	movieRepository.create(newMovie, function(err){
		if(err){
			console.log(err);
			res.render("movie/create", { title: "Create", movie : newMovie, validation: err});
		}else{
			res.redirect("movies");
		}
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

exports.update = function(req, res){
	var updatedMovie = {
		id: req.body.id,
		title : req.body.title,
		releasedate : new Date(req.body.releasedate),
		genre : req.body.genre,
		price : req.body.price, 
		rating: req.body.rating
	};

	movieRepository.edit(updatedMovie, function(err){
		if(err){
			console.log(err);
			res.render("movie/edit", { title: "Edit", movie : updatedMovie, validation: err});
		}else{
			res.redirect("movies");
		}
	})
}






