const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


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

//On save hook, encrypt password
userSchema.pre('save', function(next){

  //Get access to the user model
  const user = this;

  //Only hash the password if it has been modified
  if ( !user.isModified('password')) {
    return next();
  }

  //Generate a salt
  bcrypt.genSalt(10, function(err, salt){
    if(err) { return next(err) }
    //Hash the password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err) { return next(err) }
      //Over ride with encrypted password
      user.password = hash;
      next();
    })

  })

})


//Create the model class
const ModelClass = mongoose.model('user', userSchema);

//Export the Model
module.exports = ModelClass;
