/*
Title: Hoitenga-person.js
Author: Professor Krasso
Date: July 3, 2023
Modified By: Jennifer Hoitenga
Description: Building the Customer's API
Sources Used: 
WEB 420 GitHub Repository
Assignment 7 Instructions
SoapUI Guide
*/

// Require statement for mongoose
const mongoose = require('mongoose');

// Assigning the mongoose.Schema object to a variable named Schema
const Schema = mongoose.Schema;

// Creating the lineItemSchema
const lineItemSchema = new Schema({
  name: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

// Creating the invoiceSchema
const invoiceSchema = new Schema({
  subtotal: { type: Number },
  tax: { type: Number },
  dateCreated: { type: String },
  dateShipped: { type: String },
  lineItems: [lineItemSchema],
});

// Creating the customerSchema
const customerSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  userName: { type: String },
  invoices: [invoiceSchema],
});

// Exporting the model
module.exports = mongoose.model('Customer', customerSchema);
