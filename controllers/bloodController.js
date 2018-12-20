var express = require('express');
var router = express.Router();

var bloodusers = require('../models/blood');

router.get('/', bloodusers.getAll, renderIndex);
router.get('/getsearch', bloodusers.findby , renderSearch2);
router.get('/new', renderNew);
router.get('/search', renderSearch);
router.get('/:id/edit', bloodusers.find, renderEdit);
/* ^^ the edit page edits all the information for a single bloodusers.
  In order to edit that information we have to get all the data for a single bloodusers.
  We're already getting all the data for a single bloodusers in the show route using bloodusers.find,
  so we use bloodusers.find in our GET edit route.
*/

router.get('/:id', bloodusers.find,  renderShow);

router.post('/', bloodusers.create, redirectShow);
router.delete('/:id', bloodusers.delete, redirectIndex);
router.put('/:id', bloodusers.update, redirectShow);

function renderIndex(req, res){
  var mustacheVariables = {
    bloodusers: res.locals.bloodusers
  }
  res.render('./blood/index', mustacheVariables);
}

function renderShow(req,res){
  var mustacheVariables = res.locals.bloodusers;
  res.render('./blood/show', mustacheVariables);
}

function renderEdit(req,res){
  var mustacheVariables = res.locals.bloodusers;
  if (mustacheVariables.legendary === true) {
    mustacheVariables.legendary = 'checked';
  } else {
    mustacheVariables.legendary = '';
  }
  res.render('./blood/edit', mustacheVariables);
}

function renderNew(req, res){
  res.render('./blood/new');
}
function renderSearch(req, res){
  res.render('./blood/search');
}
function renderSearch2(req, res){
  res.render('./blood/search2');
}

function redirectShow(req, res) {
  console.log(req.body);
  // res.redirect(`/blood/${res.locals.bloodusers_id}`);
  // console.log(req.body);
  res.redirect(`/`);
}

function redirectIndex(req, res){
  res.redirect('/blood');
}

module.exports = router;