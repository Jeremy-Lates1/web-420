"use strict";
/*
============================================
; Title:  lates-composer-routes.js
; Author: Jeremy Lates
; Date:  02/04/2024
; Comments: Source is adapted from Professor Krasso assignment handouts
; Source: Adapted from https://github.com/buwebdev/web-420/blob/master/routes/fruit-routes.js
;===========================================
*/
const express = require("express");

const router = express.Router();

const Composer = require("../models/lates-composer");

/**
 * findAllComposers
 * @openapi
 * /api/composers:
 *   get:
 *     tags:
 *       - Composers
 *     description: API for returning an array of composer objects.
 *     summary: returns an array of composer in JSON format.
 *     responses:
 *       '200':
 *         description: array of composers.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.get("/composers", async (req, res) => {
  console.log("Made it to composer find all router");
  try {
    Composer.find({}, function (err, composers) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(composers);
        res.json(composers);
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
 * findComposerById
 * @openapi
 * /api/composer/{id}:
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
router.get("/composers/:id", async (req, res) => {
  try {
    Fruit.findOne({ _id: req.params.id }, function (err, composer) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(composer);
        res.json(composer);
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
 * createComposer
 * @openapi
 * /api/composer:
 *   post:
 *     tags:
 *       - Composers
 *     name: createComposer
 *     description: API for adding a new composer document to MongoDB Atlas
 *     summary: Creates a new composer document
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
router.post("/composers", async (req, res) => {
  try {
    console.log(`first name: ${req.body.firstName}`);
    const newComposer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };

    await Composer.create(newComposer, function (err, composer) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(composer);
        res.json(composer);
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
