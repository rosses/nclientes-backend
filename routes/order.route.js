const express = require("express");
const router = express.Router();
const validateMiddleware = require("../middlewares/validate.middleware");
const OrderController = require("../controllers/order.controller");
const { validate } = require("joi/lib/types/lazy");
require("express-async-errors");

router.get("/filter", validateMiddleware(null), OrderController.filter);

router.post("/", validateMiddleware(null), OrderController.create);
router.get("/", validateMiddleware(null), OrderController.list);
router.get("/:orderId", validateMiddleware(null), OrderController.get);
router.post("/save-order", validateMiddleware(null), OrderController.saveOrder);
router.post("/add-order", validateMiddleware(null), OrderController.addOrder);
router.post("/delete-order", validateMiddleware(null), OrderController.deleteOrder)
module.exports = router;
