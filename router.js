const Authentication = require('./controllers/authentication');
const Policy = require('./controllers/policy');

module.exports = function(app) {
  app.get('/', function(req,res){
    res.send("Welcome to Project Calypso API");
  });

  //Sign In Routes
  app.post('/signup', Authentication.signup);
  app.post('/signin', Authentication.signin);

  //Policy Routes
  app.post('/createPolicy/:id', Policy.createPolicy);
  app.get('/getAllPolicies/:id',Policy.getAllPolicies);


}
