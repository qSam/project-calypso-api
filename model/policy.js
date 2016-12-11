const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define the Model

const memberSchema = new Schema({
  member: String
});

const policySchema = new Schema({
  totalAmount: Number,
  policyLength: Number,
  policyMembers: [memberSchema]
})


//Create the policy class
const PolicyClass = mongoose.model('policy', policySchema);

//Export the model
module.exports = PolicyClass;
