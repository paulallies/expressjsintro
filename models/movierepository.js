var mongoose = require("mongoose");
var config = require("../config");


var schema = mongoose.Schema(require("./movie"));
var Movie = mongoose.model('Movie', schema);


exports.getAll = function(cb){
	var db = mongoose.connect(config.moviesConnectionString);
	Movie.find(
        function(err, docs) {
        	if (!err){ 
				var movieList = [];
	            for(var d in docs)
	            {
	            	movieList.push({
	            		id : docs[d]._id,
		               	title : docs[d].title,
		               	releasedate : (new Date(docs[d].releasedate)).toDateString(),
		               	genre : docs[d].genre,
		               	price : docs[d].price
	               	});
            	}
               	cb(movieList);
               	db.disconnect();
            }
            else { 
            	throw err;
            }
        }
    );	
}

exports.getMovie = function(id, cb){
	var db = mongoose.connect(config.moviesConnectionString);
	Movie.findOne({ _id : id},
        function(err, doc) {
        	if (!err){ 
               	cb(doc);
               	db.disconnect();
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