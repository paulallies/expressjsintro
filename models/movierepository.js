var mongoose = require("mongoose");
var config = require("../config");


var schema = mongoose.Schema(require("./movie"));
var Movie = mongoose.model('Movie', schema);

exports.getAll = function(cb){
	mongoose.connect(config.moviesConnectionString);
	Movie.find(
        function(err, docs) {
        	if (!err){ 
				var movieList = [];
	            for(var d in docs)
	            {
	            	movieList.push({
		               	title : docs[d].title,
		               	releasedate : docs[d].releasedate,
		               	genre : docs[d].genre,
		               	price : docs[d].price
	               	});
            	}
               	cb(movieList);
               	mongoose.disconnect();
            }
            else { 
            	throw err;
            }
        }
    );	
}

exports.create = function(movie, cb){
mongoose.connect(config.moviesConnectionString);
	var newMovie = new Movie({ 
		title: movie.title,  
		releasedate : movie.releasedate,
		genre : movie.genre,
		price : movie.price
	});

	newMovie.save(function (err) {
		mongoose.disconnect();
		if (err) {
	  		cb(err);
	  	}else{
	  		cb();
		}
		
	});

}