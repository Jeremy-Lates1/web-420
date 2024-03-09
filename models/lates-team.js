"use strict";
/*
============================================
; Title:  lates-team.js
; Author: Jeremy Lates
; Date:  02/04/2024
; Comments: Source is adapted from Professor Krasso assignment handouts
; Code adapted from: GitHub Source:  https://github.com/buwebdev/web-420/blob/master/models/student.js
;                                   
;===========================================
*/

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let playerSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  salary: { type: Number },
});

let teamSchema = new Schema({
  teamId: { type: String },
  name: { type: String },
  mascot: { type: String },
  players: { type: [playerSchema] },
});

module.exports = mongoose.model("Team", teamSchema);
