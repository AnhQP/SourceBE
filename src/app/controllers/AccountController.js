const Account = require("../models/account");
const bcrypt = require("bcrypt");
const saltRound = 10;

class AccountController {
  //[GET] Sign In    async signupPost(req, res, next) {
  async signUpPost(req, res, next) {
    await Account.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
      .then(() => res.render("login"))
      .catch((error) => {
        console.error("Error inserting data into MongoDB:", error);
        next(error);
      });
  }
  //[post] /login
  async signInPost(req, res) {
    try {
      const check = await Account.findOne({ email: req.body.email });
      if (check.password === req.body.password) {
        res.redirect("/");
      } else {
        res.send("Wrong Password!");
      }
    } catch {
      res.send("Wrong details!");
    }
  }
  async changePassword(req, res, next) {}
}
module.exports = new AccountController();
