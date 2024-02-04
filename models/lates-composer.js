"use strict";
/*
============================================
; Title:  lates-composer.js
; Author: Jeremy Lates
; Date:  02/04/2024
; Comments: Source is adapted from Professor Krasso assignment handouts
;  Code adapted from: GitHub Source: https://github.com/buwebdev/web-340/tree/master/week-6
;                                    https://github.com/buwebdev/web-420/blob/master/models/student.js
;===========================================
*/

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let composerSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
});

module.exports = mongoose.model("Composer", composerSchema);
