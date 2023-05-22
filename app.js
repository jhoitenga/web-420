// Require statements for express, http, swagger-ui-express, swagger-jsdoc, and mongoose
const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');

// Create a new variable named app and assign it to express library 
const app = express();

// Set the port to 3000
const PORT = process.env.PORT || 3000;

// Set the app to use express.json()
app.use(express.json());

// Set the app to use url encoded
app.use(express.urlencoded({ extended: true }));

// Object literal
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB 420 RESTful APIs',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'], //files containing annotations for the OpenAPI specification
};

// Creating a new variable name openapiSpecification & calling the swaggerJsdoc library using the options object literal
const openapiSpecification = swaggerJsdoc(options);

// Wire openapiSpecification variable to app variable
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Listening
app.listen(PORT, () => {
    console.log(`Application started and listening on port ${PORT}`);
  });