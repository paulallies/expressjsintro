
var Validator = require('validator').Validator;
var validate = new Validator();

Validator.prototype.error = function (err_msg) {
    return false;
};

var validateLength = function(val){
	return validate.check(val).len(2, 50); 
};

var titleValidate = [
    { validator: validateLength, msg: 'Title must be between 2 and 50 characters in length'}

];

var priceValidate = [
    { 
    	validator: function(val){
			var minval = 1;
			var maxval = 100;
			return validate.check(val).min(minval) && validate.check(val).max(maxval);
		}, 
		msg: 'Price must be between $1 and $100'
	}
];

var ratingValidate = [
	{
    	validator: function(val){
			var ratingArray = ["PG", "R", "R16", "R18", "PG13"];
			return ratingArray.indexOf(val) > -1;
		}, 
		msg: "Rating must be 'PG', 'R16', 'R18', 'R' or 'PG13' "
	}
];

module.exports = {
        title : { type: String, required: true, validate: titleValidate},
        releasedate : { type: Date ,  required: true},
        genre : { type : String, required : true},
        price : { type: Number, required: true, validate : priceValidate }, 
        rating: {type: String,  uppercase: true, required: true, validate : ratingValidate}
};