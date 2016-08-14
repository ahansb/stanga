var auth = require('./auth'),
    controllers = require('../controllers');

module.exports=function(app){
  app.get('/register',controllers.users.getRegistered);
  app.post('/register',controllers.users.postRegister);

  app.get('/login',controllers.users.getLogin);
  app.post('/login',auth.login);
  app.get('/logout',auth.logout);

  app.get('/error-login', function (req, res) {
    res.render('users/error-page');
  });

  app.get('/error-auth', function (req, res) {
    res.render('users/error-unauth');
  });

  app.get('/',controllers.home.getHome);

  app.get('*', function (req, res) {
    res.render('not-found');
  });
};