exports.logon = function(req, res){
    res.render('account/logon', { 
        title: 'Logon'
      
    });
};

exports.register = function(req, res){
    res.render('account/register', { 
        title: 'Register'
      
    });
};