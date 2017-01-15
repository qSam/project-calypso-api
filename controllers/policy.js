const User  = require('../model/user');


exports.createPolicy = function(req,res,next) {
    const username = req.params.id;
    const policyNumber = req.body.policyName;
    const totalAmount = req.body.totalAmount;
    const policyLength = req.body.policyLength;
    const policyMembers = req.body.policyMembers;

    if(!policyNumber) {
      return res.status(422).send({Error:'Policy Number not provided'});
    }


    if(!totalAmount) {
          return res.status(422).send({Error:'Total policy amount not provided'});
    }


     if(!policyLength) {
          return res.status(422).send({Error:'Policy length not provided'});
     }

     if(!policyMembers) {
       policyMembers = [];
     }




    User.findOne({username:username}, function(err,user){
        if(err) {
          return next(err);
        }
        //res.send(userFound);
        if(user){
          const policyObject = {
            "policyNumber":policyNumber,
            "totalAmount":totalAmount,
            "policyLength":policyLength,
            "policyMembers":policyMembers
          }

          console.log(policyObject);
          user.policies.push(policyObject);
          user.save();
          res.send("User has been found and policy added");
        } else {
          res.send("User not found");
        }

    });

    //res.send("The policy has been created");
}

exports.getAllPolicies = function(req,res, next) {
  const username = req.params.id;

  User.findOne({username:username}, function(err, user){
    if (err) {
      return next(err);
    }

    if(user) {
        res.send(user.policies);
    } else {
      res.send("User not found");
    }
  });
}
