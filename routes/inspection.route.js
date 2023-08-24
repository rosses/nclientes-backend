const express = require("express");
const router = express.Router();
const validateMiddleware = require("../middlewares/validate.middleware");
const InspectionController = require("../controllers/inspection.controller");
require("express-async-errors");

router.post("/", validateMiddleware(null), InspectionController.create);
router.get("/cylinder/:cylinderId", validateMiddleware(null), InspectionController.fromCylinder);

module.exports = router;