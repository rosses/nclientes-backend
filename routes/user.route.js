const express = require("express");
const router = express.Router();
const UserValidationRules = require("../validation-rules/user.rule");
const validateMiddleware = require("../middlewares/validate.middleware");
const UserController = require("../controllers/user.controller");
require("express-async-errors");

router.get("/", UserController.getAll);
router.get("/me", UserController.getMe);
router.post(
  "/",
  validateMiddleware(UserValidationRules.create),
  UserController.create
);

router.post("/add", UserController.addUser);
router.post("/delete", UserController.deleteUser);

router.get("/viewUser/:id", UserController.viewUser);

router.get("/distributors", UserController.getDistributor);
module.exports = router;
