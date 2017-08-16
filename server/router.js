//Adding a route, user can visit
const Authentication = require('./controllers/authentication');


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


module.exports =function (app) {
    app.post('/signup', Authentication.signup);
};