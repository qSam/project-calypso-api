const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Define the Model

const memberSchema = new Schema({
  member: String
});

const policySchema = new Schema({
  policyNumber: String,
  totalAmount: Number,
  policyLength: Number,
  policyMembers: [memberSchema]
});

const userSchema = new Schema({
  email: {type: String, unique: true, lowercase: true},
  password: String,
  username: String,
  policies:[policySchema]
});


//Create the model class
const ModelClass = mongoose.model('user', userSchema);

//Export the Model
module.exports = ModelClass;
