var repo = require("./models/movierepository");
repo.create({
	title: "Pulp fiction",
	releasedate : new Date()
}, function(err){
	if(err){
		console.log(err);
	}else{
		console.log("Saved...");
	}
});