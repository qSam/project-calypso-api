const Policy = require('../model/policy');
const User  = require('../model/user');


exports.createPolicy = function(req,res,next) {
    const email = req.body.email;
    const policyNumber = req.body.policyNumber;
    const totalAmount = req.body.totalAmount;
    const policyLength = req.body.policyLength;
    const policyMembers = [];

    if(!policyNumber) {
      return res.status(422).send({Error:'Policy Number not provided'});
    }


    if(!totalAmount) {
          return res.status(422).send({Error:'Total policy amount not provided'});
    }


     if(!policyLength) {
          return res.status(422).send({Error:'Policy length not provided'});
     }




    User.findOne({email:email}, function(err,user){
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
          res.send("User has been found");
        } else {
          res.send("User not found");
        }

    });

    //res.send("The policy has been created");
}
