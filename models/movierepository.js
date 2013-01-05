var mongoose = require("mongoose");
mongoose.connect('mongodb://sa:sa@ds047207.mongolab.com:47207/movies');

var schema = mongoose.Schema(require("./movie"));
var Movie = mongoose.model('Movie', schema);

exports.getAll = function(cb){
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