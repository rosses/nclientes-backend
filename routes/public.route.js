const express = require("express");
const router = express.Router();
const validateMiddleware = require("../middlewares/validate.middleware");
const PublicController = require("../controllers/public.controller");
require("express-async-errors");

router.get("/by-sapcode", PublicController.getBySapCode);
router.get("/orders-by-sapcode", PublicController.getOrdersBySapCode);
router.post("/add-order", PublicController.addOrder);
router.get("/code", PublicController.getCode);
router.get("/reasons", PublicController.getReasons);
router.get("/defects", PublicController.getDefects);
router.get("/factorys", PublicController.getFactorys);
router.get("/damages", PublicController.getDamages);
router.get("/inspectors", PublicController.getInspectors);
router.get("/dashboard-stats", PublicController.getDashboardStats);
router.get("/reInspectors", PublicController.getReInspectors);
router.get('/order',PublicController.getOrder);

module.exports = router;