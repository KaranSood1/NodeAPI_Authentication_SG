//Logic to process a request

const  User = require('../models/user');


exports.signup = function (req, res, next) {

    //Data posted is in the Body property of the Request

    //console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;



    //a check to see if both email and pass are passed
    if(!email || !password){
        return res.status(422).send({error: 'You must Provide both'});
    }


         //(1) See if a user with given email exist
        User.findOne({ email: email}, function (err, existingUser) {
            if (err){return next(err);
            }

        //(2) If a user with email does exist, return an error
        if(existingUser){
            return res.status(422).send({error: 'Email Exist'});
        }

        //(3) if a user with does not exist, create and save the user
        const user = new User({
           email: email,
           password: password
        });

        user.save(function (err) {
            if(err){return next(err)}
        });

        //(4)Respond to request indicating the user was crated
        res.json({success: 'User Saved'});

    })




};