var movieRepository = require("../models/movierepository");
var should = require("should");

describe('movierepository', function(){
  
  describe('#getAllMovies', function(){
    var movieCollection = movieRepository.getAllMovies();
    it('should return an array of movies', function(){
      	movieCollection.should.be.an.instanceOf(Array);
    });
  });

  describe('#create', function(){
    it('should create a movie object', function(){
      movieRepository.create({
        title: "Pulp Fiction",
        releasedate: new Date(),
        genre: "Comedy",
        price: 34.99
      }, function(err){
        if(err){
          console.log("An error occured!");
        }
        console.log("Saved Successfully");
      });
    });
  });

});
