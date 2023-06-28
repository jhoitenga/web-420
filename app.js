/*
Title: app.js
Author: Professor Krasso
Date: May 30, 2023
Modified By: Jennifer Hoitenga
Description: Creating web-420 GitHub repository
Sources Used: 
WEB 420 RESTful APIs assignment instructions
*/

// Require statements for express, http, swagger-ui-express, swagger-jsdoc, and mongoose.
const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');

// Creating a new variable named app and assign it to express library.
const app = express();

// Setting the port to 3000.
const PORT = process.env.PORT || 3000;

// Setting the app to use express.json().
app.use(express.json());

// Setting the app to use url encoded.
app.use(express.urlencoded({ extended: true }));

// Setting up the routing for the /api endpoints
const composersAPI = require('./routes/Hoitenga-composer-routes');
const personAPI = require('./routes/Hoitenga-person-routes');
const userAPI = require('./routes/Hoitenga-session-routes');

// Connecting to Mongo
const CONN = 'mongodb+srv://web420_user:s3cr3t@bellevueuniversity.g473hiy.mongodb.net/web420DB';

// Showing Server Connection Messages
mongoose
  .connect(CONN, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connection to WEB 420 MongoDB database was successful');
  })
  .catch((err) => {
    console.log('MongoDB Error: ' + err.message);
  });

// Defining an object literal with named options.
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WEB 420 RESTful APIs',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], // Files containing annotations for the OpenAPI specification.
};

// Creating a new variable name openapiSpecification & calling the swaggerJsdoc library using the options object literal.
const openapiSpecification = swaggerJsdoc(options);

// Wiring openapiSpecification variable to app variable.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/api', composersAPI);
app.use('/api', personAPI);
app.use('/api', userAPI);

// Start the server and make it listen on port 3000.
app.listen(PORT, () => {
  console.log(`Application started and listening on port ${PORT}`);
});
