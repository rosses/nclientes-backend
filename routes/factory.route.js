const express = require("express");
const router = express.Router();
const validateMiddleware = require("../middlewares/validate.middleware");
const FactoryController = require("../controllers/factory.controller");
require("express-async-errors");

router.post("/", validateMiddleware(null), FactoryController.create);
router.get("/", validateMiddleware(null), FactoryController.list);

module.exports = router;