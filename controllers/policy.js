const Policy = require('../model/policy');


exports.createPolicy = function(req,res,next) {
    const policyNumber = req.body.policyNumber;
    const totalAmount = req.body.totalAmount;
    const policyLength = req.body.policylength;
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
           return res.status(422).send({Error:'Policy Members not provided'});
    }


    Policy.findOne({policyNumber:policyNumber}, function(err,policyFound){

    });

    res.send("THe policy is about to be created");
}
