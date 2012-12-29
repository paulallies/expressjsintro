
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('home/index', { 
        title: 'Home',
        message: 'Welcome to Express!'
      
    });
};

exports.about = function(req, res){
    res.render('home/about', { 
        title: 'About',
        message: "Put content here."
    });
};