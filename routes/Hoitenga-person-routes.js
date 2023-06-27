/*
Title: Hoitenga-person-routes.js
Author: Professor Krasso
Date: June 21, 2023
Modified By: Jennifer Hoitenga
Description: Building the Person's API
Sources Used: 
WEB 420 GitHub Repository
Assignment 5 Instructions
SoapUI Guide
*/

// Require statement for Express
const express = require('express');

// Require statement for Router
const router = express.Router();

// Require statement for Person
const Person = require('../models/Hoitenga-person');

/**
 * findAllPersons
 * @openapi
 * /api/persons:
 *   get:
 *     tags:
 *       - Person
 *     description: API for returning an array of person objects
 *     summary: returns an array of persons in JSON format.
 *     responses:
 *       '200':
 *         description: Array of person documents.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

router.get('/persons', async (req, res) => {
  try {
    Person.find({}, function (err, persons) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(persons);
        res.json(persons);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

/**
 * createPerson
 * @openapi
 * /api/persons:
 *   post:
 *     tags:
 *       - Person
 *     name: createPerson
 *     description: API for adding a new Person document to MongoDB Atlas
 *     summary: Creates a new Person document
 *     requestBody:
 *       description: Person information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - type
 *             properties:
 *               type:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Array of person documents.
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/persons', async (req, res) => {
  try {
    const newPerson = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      roles: req.body.roles,
      dependents: req.body.dependents,
      birthDate: req.body.birthDate,
    };

    await Person.create(newPerson, function (err, person) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(person);
        res.json(person);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

module.exports = router;
