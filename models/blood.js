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

bloodusers.find = function (req, res, next) {
  var id = req.params.id;
  db.oneOrNone("SELECT * FROM bloodusers INNER JOIN gender on bloodusers.id = gender.id WHERE bloodusers.id = $1;", [id])
    .then(function(result){
      res.locals.bloodusers = result;
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
    
}

bloodusers.findby = function (req, res, next) {
  var city = req.query.type1;
  var blood = req.query.type2;
    console.log("city : ",city);
  db.manyOrNone("SELECT * FROM bloodusers INNER JOIN gender on bloodusers.id = gender.id WHERE bloodusers.city = $1 AND bloodusers.blood_type = $2;", [city , blood])
    .then(function(result){
      res.locals.bloodusers = result;
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
}
var idd;
bloodusers.create = function(req, res, next){
  var pokeData = {
    name: req.body.name,
    type1: req.body.type1,
    type2: req.body.type2 || "",
    hitpoints: req.body.hitpoints,
    attack: req.body.attack,
    gender :req.body.gender,
    img: req.body.img
  }
  console.log(req.body)
    
  db.one(
    `INSERT INTO bloodusers
    (name, city, blood_type, phone, details, location ) 
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`,
    [pokeData.name, pokeData.type1, pokeData.type2, pokeData.hitpoints, pokeData.attack,
    pokeData.img])
    .then(function (result) {
      console.log(result);
      res.locals.bloodusers_id = result.id;
     idd = res.locals.bloodusers_id;
    console.log("after : " , idd);
      db.none(
    `INSERT INTO gender
    (id, gender) 
    VALUES ($1, $2);`,
    [idd, pokeData.gender])
    .then(function (result) {
              console.log("the locals : ",idd);
    })
    .catch(function (error) {
      console.log(error);
      next();
    })
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    })
    
}

bloodusers.update = function(req, res, next){
  var pokeData = {
   name: req.body.name,
    type1: req.body.type1,
    type2: req.body.type2 || "",
    hitpoints: req.body.hitpoints,
    attack: req.body.attack,
    gender: req.body.gender,
    img: req.body.img
  }

  db.one(`UPDATE bloodusers SET name = $1, city = $2, blood_type = $3, phone = $4,
  details = $5, location = $6 WHERE id = $7 RETURNING id;`, [pokeData.name, pokeData.type1, pokeData.type2, pokeData.hitpoints, pokeData.attack, pokeData.img, req.params.id])
    db.one(`UPDATE gender SET gender = $1 WHERE id = $2 RETURNING id;`, [pokeData.gender, req.params.id])
    
    .then(function(result) {
      res.locals.bloodusers_id = result.id;
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
}

bloodusers.delete = function(req, res, next){
  db.none('DELETE FROM bloodusers WHERE id=$1;', [req.params.id])
    .then(function(){
      console.log('successful delete');
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
}

module.exports = bloodusers;