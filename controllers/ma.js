var express = require('express');
var router = express.Router();

var gender2 = require('../models/all');

router.get('/', gender2.getAll, renderIndex);

function renderIndex(req, res){
    var mustacheVariables = {
      nn: res.locals.bloodusers
    }
    res.render('./blood/an', mustacheVariables);
  }


module.exports = router;
