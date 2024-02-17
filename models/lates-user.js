/*
============================================
; Title:  lates-user.js
; Author: Jeremy Lates
; Date:   02-16-2024
; Code adapted from https://github.com/buwebdev/web-420/blob/master/models/password.js
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  userName: { type: String },
  password: { type: String },
  emailAddress: { type: Array },
});

module.exports = mongoose.model("User", userSchema);
