
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index', { 
        title: 'My Movie List',
        message: 'Welcome to Express!'
      
    });
};