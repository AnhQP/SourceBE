const express = require("express");
const router = express.Router();

const accountController = require("../app/controllers/AccountController");

router.post("/signin", accountController.signInPost);
router.post("/signup", accountController.signUpPost);

module.exports = router;
