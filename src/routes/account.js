const express = require("express");
const router = express.Router();

const accountController = require("../app/controllers/AccountController");

router.post("/signin", accountController.signIn);
router.post("/signup", accountController.signUp);

module.exports = router;
