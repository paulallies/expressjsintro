var config = require("../config");
var mongoose = require("mongoose");


var schema = mongoose.Schema(require("./movie")),
	Movie = mongoose.model('Movie', schema);

exports.getAll = function (cb) {
	mongoose.connect(config.moviesConnectionString);
	Movie.find(function (err, docs) {
		var d;
		mongoose.connection.close();
		if (!err) {
			var movieList = [];
			if (docs) {
				for (d in docs) {
					movieList.push({
						id : docs[d]._id,
						title : docs[d].title,
						releasedate : (new Date(docs[d].releasedate)).toDateString(),
						genre : docs[d].genre,
						price : docs[d].price,
						rating: docs[d].rating
					});
				}
			}
			cb(movieList);
		} else { 
			throw err;
        }
    });	
}

exports.getMovie = function(id, cb){
	mongoose.connect(config.moviesConnectionString);
	Movie.findOne({ _id : id},
        function(err, doc) {
        	mongoose.connection.close();
        	if (!err){ 
               	cb({
               			id : doc._id,
						title : doc.title,
						releasedate : (new Date(doc.releasedate)).toDateString(),
						genre : doc.genre,
						price : doc.price,
						rating: doc.rating
               	});
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
		price : movie.price,
		rating: movie.rating.toUpperCase()
	});

	newMovie.save(function (err) {
		mongoose.connection.close();
		if (err) {
	  		cb(err);
	  	}else{
	  		cb();
		}
		
	});
}

exports.delete = function(id, cb){
	mongoose.connect(config.moviesConnectionString);
	Movie.remove({ _id : id},
        function(err, doc) {
        	mongoose.connection.close();
        	if (!err){ 
               	cb();
            }
            else { 
            	throw err;
            }
        }
    );
}

exports.edit = function(movie, cb){
	mongoose.connect(config.moviesConnectionString);

	var updatedMovie = new Movie({
		_id : mongoose.Schema.Types.ObjectId(movie.id),
		title: movie.title,  
		releasedate : movie.releasedate,
		genre : movie.genre,
		price : movie.price,
		rating: movie.rating.toUpperCase()
	});

	updatedMovie.save(function(err) {
        	mongoose.connection.close();
        	if (!err){ 
               	cb();
            }
            else { 
            	cb(err)
            }
        }
    );
}