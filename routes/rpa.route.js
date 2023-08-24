const express = require("express");
const router = express.Router();
const RPAController = require("../controllers/rpa.controller");
require("express-async-errors");

router.get('/run',RPAController.runRPA);

module.exports = router;