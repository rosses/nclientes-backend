const express = require("express");
const router = express.Router();
const validateMiddleware = require("../middlewares/validate.middleware");
const DefectController = require("../controllers/defect.controller");
require("express-async-errors");

router.post("/", validateMiddleware(null), DefectController.create);
router.get("/", validateMiddleware(null), DefectController.list);

module.exports = router;