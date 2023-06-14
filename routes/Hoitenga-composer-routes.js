/*
Title: Hoitenga-composer-routes.js
Author: Professor Krasso
Date: June 14th, 2023
Modified By: Jennifer Hoitenga
Description: Creating web-420 GitHub repository
Sources Used: 
WEB 420 GitHub Repository
Assignment 4 Instructions
SoapUI Guide
*/

// Require statement for Express
const express = require('express');

// Require statement for Router
const router = express.Router();

// Require statement for Composer
const Composer = require('../models/Hoitenga-composer');

/**
 * findAllComposers
 * @openapi
 * /api/composers
 *   get:
 *     tags:
 *       - Composers
 *     description: API for returning an array of composer objects.
 *     summary: returns an array of composers in JSON format.
 *     responses:
 *       '200':
 *         description: array of composers.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

router.get('/composers', async(req, res) => {
    try {
        Composer.find({}, function(err, composers) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            } else {
                console.log(composers);
                res.json(composers);
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        });
    }
});


/**
 * findComposerById
 * @openapi
 * /api/composers/{id}:
 *   get:
 *     tags:
 *       - Composers
 *     description:  API for returning a composer document
 *     summary: returns a composer document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Composer document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Composer document
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */

router.get('/composers/:id', async(req, res) => {
    try {
        Composer.findOne({'_id': req.params.id}, function(err, composer) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                });
            } else {
                console.log(composer);
                res.json(composer);
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        });
    }
});


/**
 * createComposer
 * @openapi
 * /api/composers:
 *   post:
 *     tags:
 *       - Composers
 *     name: createComposer
 *     description: API for adding a new Composer document to MongoDB Atlas
 *     summary: Creates a new Composer document
 *     requestBody:
 *       description: Composer information
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
 *         description: Composer added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/composers', async(req, res) => {
    try {
        const newComposer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        };

        await Composer.create(newComposer, function(err, composer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            } else {
                console.log(composer);
                res.json(composer);
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        });
    }
});

module.exports = router;