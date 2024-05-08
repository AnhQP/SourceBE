const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//UserSchema.plugin
const AccountSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  phone: { type: Number, require: true },
});

module.exports = mongoose.model("Account", AccountSchema);
