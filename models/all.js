var db = require('../db/config');

var bloodusers = {};

// create a method that gets all the data from the "bloodusers" table
bloodusers.getAll = function (req, res, next) {
  db.manyOrNone("SELECT * FROM bloodusers;")  // query the database
    .then(function (result) {   // return the data as a javascript object "result"
      res.locals.bloodusers = result;  // save that javascript object to the response object in res.locals.bloodusers
      next();  // move on to the next command
    })
    .catch(function(error){ // if there is an issue when getting all the bloodusers
      console.log(error); // log the error
      next(); // move on to the next command
    })
}
module.exports = bloodusers;