


exports.getAllMovies = function(){
	var movieList = [];
	return movieList;
}

exports.create = function(movie, cb){
var mongoose = require("mongoose");
mongoose.connect('mongodb://sa:sa@ds047207.mongolab.com:47207/movies');

var schema = mongoose.Schema(require("./movie"));
var Movie = mongoose.model('Movie', schema);
	var newMovie = new Movie({ 
		title: movie.title,  
		releasedate : movie.releasedate,
		genre : movie.genre,
		price : movie.price
	});

	newMovie.save(function (err) {
		if (err) {
	  		cb(err);
	  	}else{
	  		cb();
		}
		mongoose.disconnect();
	});

}