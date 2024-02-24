"use strict";
/*
============================================
; Title:  lates-customer.js
; Author: Jeremy Lates
; Date:  02/22/2024
; Comments: Source is adapted from Professor Krasso assignment handouts
;  
;                                    
;===========================================
*/

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Line item schema
let lineItemSchema = new Schema({
  name: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

//Invoice schema
let invoiceSchema = new Schema({
  subtotal: { type: Number },
  tax: { type: Number },
  dateCreated: { type: String },
  dateShipped: { type: String },
  lineItems: { type: [lineItemSchema] },
});

//Customer Schema
let customerSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  userName: { type: String },
  invoices: { type: [invoiceSchema] },
});

module.exports = mongoose.model("Customer", customerSchema);
