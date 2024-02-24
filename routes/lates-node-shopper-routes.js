"use strict";
/*
============================================
; Title:  lates-node-shopper-routes.js
; Author: Jeremy Lates
; Date:  02/22/2024
; Comments: Source is adapted from Professor Krasso assignment handouts
; Code adapted from GitHub source code : https://github.com/buwebdev/web-420/blob/master/routes/node-tech-routes.js
; Code adapted from GitHub source code : Source: Adapted from https://github.com/buwebdev/web-420/blob/master/routes/fruit-routes.js
===========================================
*/
const express = require("express");

const router = express.Router();

const Customer = require("../models/lates-customer");

/**
 * createCustomer
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     name: createCustomer
 *     summary: Creates a new Customer document
 *     requestBody:
 *       description: Customer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - userName
 *               - invoices
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userName:
 *                 type: string
 *               invoices:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     subtotal:
 *                       type: number
 *                     tax:
 *                       type: number
 *                     dateCreated:
 *                       type: string
 *                     dateShipped:
 *                       type: string
 *                     lineItems:
 *                       type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                            name:
 *                              type: string
 *                            price:
 *                              type : number
 *                            quantity:
 *                              type : number
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB Atlas
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/customers", async (req, res) => {
  try {
    const newCustomer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      invoices: req.body.invoices,
    };

    //console.log(newCustomer);

    await Customer.create(newCustomer, function (err, customer) {
      //console.log(newCustomer);
      if (err) {
        console.log(err);
        res.status(500).send({
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
 * createInvoiceByUserName
 * @openapi
 * /api/customers/{username}/invoices :
 *   post:
 *     tags:
 *       - Customers
 *     name: createInvoiceByUserName
 *     description: API for updating an existing document in MongoDB.
 *     summary: Updates a document in MongoDB.
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         description: userName to filter the collection by.
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
 *               - linItems
 *             properties:
 *               subtotal:
 *                 type: string
 *               tax:
 *                 type: string
 *               dateCreated:
 *                 type: string
 *               dateShipped:
 *                 type : string
 *               lintItems
 *                  type: array
 *
 *     responses:
 *       '200':
 *         description: Invoice added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/customers/:username/invoices", async (req, res) => {
  try {
    const myUserName = req.params.username;

    Customer.findOne({ userName: myUserName }, function (err, customer) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        const newInvoice = {
          userName: myUserName,
          subtotal: req.body.subtotal,
          tax: req.body.tax,
          dateCreated: req.body.dateCreated,
          dateShipped: req.body.dateShipped,
          lineItems: req.body.lineItems,
        };
        customer.invoices.push(newInvoice);
        //console.log(customer);
        customer.save();
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
 * findAllInvoicesByUserName
 * @openapi
 * /api/customers/{userName}/invoices:
 *   get:
 *     tags:
 *       - Customers
 *     description:  API for returning a customer document
 *     summary: returns a customer document
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         description: Customer document userName
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Customer document
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get("/customers/:username/invoices", (req, res) => {
  console.log(req.params.username);
  try {
    Customer.findOne(
      { userName: req.params.username },
      function (err, customer) {
        if (err) {
          console.log(err);
          res.status(501).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          console.log(customer);
          res.json(customer);
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

module.exports = router;
