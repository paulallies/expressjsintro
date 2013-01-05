var movieRepository = require("../models/movierepository");

exports.index = function(req, res){
    res.render("movie/index",{
    	movies : movieRepository.getAllMovies()
    });
};

exports.add = function(req, res){

};


