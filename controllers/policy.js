const Policy = require('../model/policy');


exports.createPolicy = function(req,res,next) {
    const policyNumber = req.body.policyNumber;
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


    Policy.findOne({policyNumber:policyNumber}, function(err,policyFound){
        if(err) {
          return next(err);
        }

        const policy = new Policy({
          policyNumber:policyNumber,
          totalAmount:totalAmount,
          policyLength:policyLength,
          policyMembers:policyMembers
        });

        policy.save(function(err){
          if(err){
            return next(err);
          }
        })
    });

    res.send("The policy has been created");
}
