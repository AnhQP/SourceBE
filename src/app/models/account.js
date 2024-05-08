const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

//UserSchema.plugin
const AccountSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  phone: { type: Number, require: true },
});

AccountSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next();
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model("Account", AccountSchema);
