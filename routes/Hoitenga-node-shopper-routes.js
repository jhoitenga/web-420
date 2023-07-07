/*
Title: Hoitenga-node-shopper-routes.js
Author: Professor Krasso
Date: July 3, 2023
Modified By: Jennifer Hoitenga
Description: Building the Customer's API
Sources Used: 
WEB 420 GitHub Repository
Assignment 7 Instructions
SoapUI Guide
*/

// Require statement for Express
const express = require('express');

// Require statement for Router
const router = express.Router();

// Require statement for Person
const Customer = require('../models/Hoitenga-customer');

/**
 * createCustomer
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     name: createCustomer
 *     description: API for adding a new Customer document to MongoDB Atlas
 *     summary: Creates a new Customer document
 *     requestBody:
 *       description: Customer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - type
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/customers', async (req, res) => {
  try {
    const newCustomer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
    };

    await Customer.create(newCustomer, function (err, customer) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(customer);
        res.json(customer);
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
 *
 * createInvoiceByUserName
 * @openapi
 * /api/customers/{userName}/invoices:
 *   post:
 *     tags:
 *       - Customers
 *     summary: Creates a new invoice.
 *     description: API for creating an invoice by userName.
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         description: userName search for collection
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Invoice information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - subtotal
 *               - tax
 *               - dateCreated
 *               - dateShipped
 *               - lineItems
 *             properties:
 *               subtotal:
 *                 type: string
 *               tax:
 *                 type: string
 *               dateCreated:
 *                 type: string
 *               dateShipped:
 *                 type: string
 *               lineItems:
 *                 type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   quantity:
 *                     type: number
 *     responses:
 *       '200':
 *         description: Invoice created successfully.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception
 *
 */

router.post('/customers/:userName/invoices', async (req, res) => {
  try {
    Customer.findOne({ userName: req.params.userName }, function (err, customer) {
      let newInvoice = {
        subtotal: req.body.subtotal,
        tax: req.body.tax,
        dateCreated: req.body.dateCreated,
        dateShipped: req.body.dateShipped,
        lineItems: req.body.lineItems,
      };
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(customer);
        customer.invoices.push(newInvoice);
        customer.save(function (err, invoice) {
          if (err) {
            console.log(err);
          } else {
            console.log(invoice);
            res.json(invoice);
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Server Exception: ${error.message}`,
    });
  }
});

/**
 * findAllInvoicesByUserName
 * @openapi
 * /api/customers/{username}/invoices:
 *   get:
 *     tags:
 *       - Customers
 *     description: API for returning invoice document
 *     summary: Returns an invoice document
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: Customer username
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Invoice document returned successfully.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception
 */

router.get('/customers/:username/invoices', async (req, res) => {
  try {
    Customer.findOne({ userName: req.params.username }, function (err, customer) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(customer);
        res.json(customer.invoices);
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
