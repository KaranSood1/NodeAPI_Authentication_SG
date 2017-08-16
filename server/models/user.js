//Telling mongoose how the user is
//This is User Schema also known as User Model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//(1) Define a schema
const userSchema = new Schema({
    //Unique is to check that emails should not be duplicate
    email: {type: String, unique: true, lowercase: true},
    password: String
});

//On save hook, encrypt Password

//Before saving this model run this function
userSchema.pre('save', function (next) {

    //get access to the user model
    const user = this;

   //generate a salt then run callback
   bcrypt.genSalt(10, function (err, salt) {
     if(err){return next(err);}

     //hash(encrypt) our password using the salt
       bcrypt.hash(user.password,salt, null , function (err,hash) {
        if(err) {return next(err);}

        //overwrite plain text password with encrypted password
        user.password = hash;

        //Go ahead n save the model
        next();
       });

   }) ;

});

//(2) Create the model class which represents all USers
const ModelClass = mongoose.model('user', userSchema);

//Export the model

module.exports= ModelClass;