const express = require("express");
const router = express.Router();
const AuthValidationRules = require("../validation-rules/auth.rule");
const validateMiddleware = require("../middlewares/validate.middleware");
const AuthController = require("../controllers/auth.controller");

router.post("/login", AuthController.login);
router.post("/validate", AuthController.validate);
router.post("/password", AuthController.password);
router.post("/password-change", AuthController.passwordChange);

module.exports = router;
