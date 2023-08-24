const express = require("express");
const router = express.Router();
const validateMiddleware = require("../middlewares/validate.middleware");
const CylinderController = require("../controllers/cylinder.controller");
require("express-async-errors");


router.get("/filter",validateMiddleware(null),CylinderController.filter)

router.post("/", validateMiddleware(null), CylinderController.create);
router.get("/", validateMiddleware(null), CylinderController.list);
router.post("/remove", validateMiddleware(null), CylinderController.remove);
router.get("/reports", CylinderController.reports);
module.exports = router;
