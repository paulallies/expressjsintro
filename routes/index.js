var homeRoutes = require('./home')
  , accountRoutes = require('./account')
  , helloworldRoutes = require('./helloworld')
  , moviesRoutes = require('./movie');

exports.registerRoutes = function(app){
    app.get('/', homeRoutes.index);
    app.get('/home/about', homeRoutes.about);
    app.get('/account/logon', accountRoutes.logon);
    app.get('/account/register', accountRoutes.register);
    app.get('/helloworld', helloworldRoutes.index);
    app.get('/helloworld/welcome', helloworldRoutes.welcome);
    app.get('/movies', moviesRoutes.index);
    app.get('/movie/create', moviesRoutes.create);
    app.post('/movie/create', moviesRoutes.add);
    app.get('/movie/details/:id', moviesRoutes.details);
}