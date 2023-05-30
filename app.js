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

// Start the server and make it listen on port 3000.
app.listen(PORT, () => {
    console.log(`Application started and listening on port ${PORT}`);
  });