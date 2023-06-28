/*
Title: Hoitenga-user.js
Author: Professor Krasso
Date: June 28, 2023
Modified By: Jennifer Hoitenga
Description: Building the User's API
Sources Used: 
WEB 420 GitHub Repository
Assignment 6 Instructions
SoapUI Guide
*/

// Require statement for mongoose
const mongoose = require('mongoose');

// Assigning the mongoose.Schema object to a variable named Schema
const Schema = mongoose.Schema;

// Creating the userSchema
const userSchema = new Schema({
  userName: { type: String },
  password: { type: String },
  emailAddress: { type: String },
});

// Exporting the model
module.exports = mongoose.model('User', userSchema);
