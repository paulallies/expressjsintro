function validator (val) {
  if(val) {
  	return true;
  }
  return false;

}

module.exports = {
        title : { type: String},
        releasedate : { type: Date},
        genre : { type : String},
        price : { type: Number}, 
        rating: {type: String}
};