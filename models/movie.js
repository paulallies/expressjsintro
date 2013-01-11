
var Validator = require('validator').Validator;
var validate = new Validator();

Validator.prototype.error = function (err_msg) {
    return false;
};

var validateLength = function(val){
	return validate.check(val).len(2, 10); 
};

var validateEmail =	function(val){
	return validate.check(val).isEmail(); 
};

var titleValidate = [
    { validator: validateLength, msg: 'String must be between 2 and 10 characters in length'}
]

module.exports = {
        title : { type: String, required: true, validate: titleValidate},
        releasedate : { type: Date, required: true, trim: true},
        genre : { type : String, trim: true, required : true},
        price : { type: Number, trim: true, required: true }, 
        rating: {type: String,  uppercase: true, enum: ['PG', 'R'], trim: true }
};