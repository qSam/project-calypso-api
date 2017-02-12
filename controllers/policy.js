const User  = require('../model/user');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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


        const policySchema = new Schema({
          policyNumber: String,
          totalAmount: Number,
          policyLength: Number,
          policyMembers: [ {type: String}]
        });
        var Policy = mongoose.model('Policy', policySchema);


        if(user){

          var policyObject = new Policy({
            "policyNumber":policyNumber,
            "totalAmount":totalAmount,
            "policyLength":policyLength,
            "policyMembers":policyMembers
          });

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

exports.fetchOnePolicy = function(req,res, next) {
  const username = req.params.id;
  const policyID = req.body.policyID;

  User.findOne({username:username}, function(err, user){
    if(err) {
      return next(err);
    }

    if(user) {

      var userPolicy;
      userPolicy = user.policies.filter( (policy) => {
        console.log(policy._id);
        return policy._id == policyID;
      });
      res.send(userPolicy);
    } else {
      res.send("User not found");
    }

  });
}
