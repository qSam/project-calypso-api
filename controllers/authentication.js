const User = require('../model/user');




exports.signup = function(req, res, next) {
  //Get values from request body
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  if (!email || !password) {
    return res.status(422).send({error: 'You must provide email and password' });
  }

  User.findOne({email:email}, function(err,userFound){
    if (err) {
      return next(err);
    }

    if (userFound) {
      return res.status(422).send({error: 'Email in use'});
    }

    //Create and save new user
    const user = new User({
      email:email,
      password:password,
      username: username
    });

    user.save(function(err){
      if(err) {
        return next(err);
      }
    })

    res.send("User has been created");

  });



}
