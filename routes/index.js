var homeRoutes = require('./home')
  , accountRoutes = require('./account');

exports.registerRoutes = function(app){
    app.get('/', homeRoutes.index);
    app.get('/home/about', homeRoutes.about);
    app.get('/account/logon', accountRoutes.logon);
    app.get('/account/register', accountRoutes.register);
}