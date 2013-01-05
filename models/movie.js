function validator (val) {
  if(val) {
  	return true;
  }
  return false;

}

module.exports = {
        title : { type: String, validate: validator },
        releasedate : { type: Date, validate : validator},
        genre : { type : String, default : ""},
        price : { type: Number, default: 0.00}
};