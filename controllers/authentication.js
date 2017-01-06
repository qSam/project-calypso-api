const User = require('../model/user');




exports.signup = function(req, res, next) {
  //Get values from request body
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;


  if (!username || !password) {
    return res.status(422).send({error: 'You must provide username and password' });
  }

  User.findOne({username:username}, function(err,userFound){
    if (err) {
      return next(err);
    }

    if (userFound) {
      return res.status(422).send({error: 'User name in use'});
    }

    //Create and save new user
    const user = new User({
      username: username,
      email:email,
      password:password,
      policies: []
    });

    user.save(function(err){
      if(err) {
        //next(err);
        return res.status(422).send({error: err});
      } else {
          res.send("User has been created");
      }
    })



  })

}

exports.signin = function(req,res,next) {

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;


  User.findOne({username:username}, function(err,user){
    if(err) { return next(err) }

    if (!user) {
      return res.status(422).send({error: 'User not found when signing in'});
    }

    console.log(user);
    //Compare password
    user.comparePassword(password, function(err, isMatch){
      if(err) { return next(err) }

      if (!isMatch){
        return res.status(422).send({error: 'Incorrect password when signing in'});
      } else {
        res.send("Username and password have matched")
      }

    })


  })
}
