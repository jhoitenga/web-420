/*
Title: Hoitenga-person.js
Author: Professor Krasso
Date: June 21, 2023
Modified By: Jennifer Hoitenga
Description: Building the Person's API
Sources Used: 
WEB 420 GitHub Repository
Assignment 5 Instructions
SoapUI Guide
*/

// Require statement for mongoose
const mongoose = require('mongoose');

// Assigning the mongoose.Schema object to a variable named Schema
const Schema = mongoose.Schema;

// Creating the roleSchema
const roleSchema = new Schema({
  text: { type: String },
});

// Creating the dependentSchema
const dependentSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
});

// Creating the personSchema
const personSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  roles: [roleSchema],
  dependents: [dependentSchema],
  birthDate: { type: String },
});

// Exporting the model
module.exports = mongoose.model('Person', personSchema);
