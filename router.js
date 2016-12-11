const Authentication = require('./controllers/authentication');


module.exports = function(app) {
  app.get('/', function(req,res){
    res.send("Welcome to Project Calypso API");
  });

  //Sign In Routes
  app.post('/signup', Authentication.signup);
  //app.post('/signin')

  //Policy Routes


}
