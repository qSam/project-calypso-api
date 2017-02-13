const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Define the model
const extendPolicySchema = new Schema({
  policyNumber:String,
  totalAmount: Number,
  policyLength: Number,
  policyMembers: [{type:String}]
});

//Creat Model class
const PolicyModelClass = mongoose.model('policy', extendPolicySchema);

//Export the model
module.exports = PolicyModelClass;
