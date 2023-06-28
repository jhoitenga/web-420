/*
Title: Hoitenga-person-routes.js
Author: Professor Krasso
Date: June 28, 2023
Modified By: Jennifer Hoitenga
Description: Building the User's API
Sources Used: 
WEB 420 GitHub Repository
Assignment 6 Instructions
SoapUI Guide
*/

// Require statement for Express
const express = require('express');

// Require statement for Router
const router = express.Router();

// Require statement for bcrypt
const bcrypt = require('bcryptjs');

// Require statement for User
const User = require('../models/Hoitenga-user');

const saltRounds = 10;

/**
 * signup
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - User
 *     description: Sign Up API
 *     summary: Create a new sign on.
 *     requestBody:
 *       description: creation of username
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *               - emailAddress
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Registered user.
 *       '401':
 *         description: Username is already in use.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

router.post('/signup', async (req, res) => {
  try {
    const { userName, password, emailAddress } = req.body;
    const existingUser = await User.findOne({ userName });

    if (!existingUser) {
      const hashedPassword = bcrypt.hashSync(password, saltRounds);
      const newRegisteredUser = {
        userName,
        password: hashedPassword,
        emailAddress,
      };

      await User.create(newRegisteredUser, function (err, user) {
        if (err) {
          console.log(err);
          res.status(501).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          console.log(user);
          res.send({ message: 'Registered user.' });
        }
      });
    } else {
      res.status(401).send({ message: 'Username is already in use.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Exception.' });
  }
});

/**
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - User
 *     summary: Allows users to log in.
 *     description: Log in API.
 *     requestBody:
 *       description: User log in.
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in.
 *       '401':
 *         description: Invalid username and/or password.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

router.post('/login', async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (user) {
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (passwordIsValid) {
        console.log('User logged in');
        res.status(200).send({ message: 'User logged in' });
      } else {
        console.log('Invalid username and/or password');
        res.status(401).send({ message: 'Invalid username and/or password' });
      }
    } else {
      res.status(401).send({ message: 'Invalid username and/or password' });
    }
  } catch (err) {
    console.log(err);
    if (err.name === 'MongoError') {
      res.status(501).send({ message: `MongoDB Exception: ${err}` });
    } else {
      res.status(500).send({ message: `Server Exception: ${err.message}` });
    }
  }
});

module.exports = router;
