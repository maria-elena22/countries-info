var express = require('express');
var router = express.Router();

const countriesController = require("../controller/countriesController");

/* GET Country Info */
router.get('/country', countriesController.getCountryInfo);

module.exports = router;
