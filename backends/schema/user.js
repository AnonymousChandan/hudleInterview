const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("mongoose-type-email");

let userSchema = new mongoose.Schema(
  {
    email: {
      type: mongoose.SchemaTypes.Email,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
);
const userModel= mongoose.model("UserAuth", userSchema);
module.exports =userModel
