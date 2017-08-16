//Adding a route, user can visit
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');


//EXAMPLE

//.get() will be used if we are getting a GET req from the client
//.post() will be used if we are getting a POST req from the client
//module.exports = function (app) {
    //Run this func if route '/' is hit
    //req is request which represents incoming http request
    //response to send back
    //next is for error handling


//     app.get('/', function (req, res, next) {
//         res.send(['Water','Phone', 'paper']);
//     });
// };

//Creating a middleware between passport and particular route
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local',{session:false });

module.exports = function (app) {

    //If anyone gets to the root route first send them to requireAuth
    // and then send them to the request handler
    app.get('/', requireAuth, function (req, res) {
        res.send({hi: 'there'});
    } );

    app.post('/signin',requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
};