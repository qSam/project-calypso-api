const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const Policy = require('./policy');


//Define the Model


const policySchema = new Schema({
  policyNumber: String,
  totalAmount: Number,
  policyLength: Number,
  policyMembers: [{type:String}]
});

const userSchema = new Schema({
  username: {type: String, unique: true},
  password: String,
  email: String,
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


  //Compare password method
  userSchema.methods.comparePassword = function(candidate, callback){
    bcrypt.compare(candidate, this.password, function(err, isMatch){
      if(err) { return callback(err) }
      callback(null, isMatch);
    })
  }


//Create the model class
const ModelClass = mongoose.model('user', userSchema);

//Export the Model
module.exports = ModelClass;
