/*
============================================
; Title:  lates-person.js
; Author: Jeremy Lates
; Date:   02-10-2024
; Code adapted from https://github.com/buwebdev/web-420/blob/master/models/student.js
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * role schema
 */
let roleSchema = new Schema({
  text: { type: String },
});

/**
 * dependent schema
 */
let dependentSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
});

/**
 * person schema
 */
let personSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  roles: [roleSchema],
  dependents: [dependentSchema],
  birthDate: { type: String },
});

module.exports = mongoose.model("Person", personSchema);
