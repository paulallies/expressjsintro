var repo = require("./models/movierepository");
/*repo.create({
	title: "Pulp fiction",
	releasedate : new Date()
}, function(err){
	if(err){
		console.log(err);
	}else{
		console.log("Saved...");
	}
});
*/
repo.getAll(function(result){
	console.log(result);
});

repo.getMovie("50ed8e0a1e4ab41f4e000001", function(result){
	console.log(result);
	})