"use strict";
/*
============================================
; Title:  lates-team-routes.js
; Author: Jeremy Lates
; Date:  03/07/2024
; Comments: Source is adapted from Professor Krasso assignment handouts
; Source: Adapted from https://github.com/buwebdev/web-420/blob/master/routes/fruit-routes.js
;===========================================
*/
const express = require("express");

const router = express.Router();

const Team = require("../models/lates-team");

/**
 * findAllTeams
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - Teams
 *     description: API for returning an array of team objects.
 *     summary: returns an array of team in JSON format.
 *     responses:
 *       '200':
 *         description: array of composers.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.get("/teams", async (req, res) => {
  console.log("Made it to teams find all router");
  try {
    Team.find({}, function (err, teams) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(teams);
        res.json(teams);
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
 * findAllPlayersByTeamId
 * @openapi
 * /api/teams/{id}/players:
 *   get:
 *     tags:
 *       - Teams
 *     description:  API for returning a team document
 *     summary: returns a team document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Customer document userName
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: team document
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get("/teams/:id/players", (req, res) => {
  console.log(req.params.id);
  try {
    Team.findOne({ teamId: req.params.id }, function (err, team) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        //Check if team id is present in DB
        if (team) {
          console.log(team);
          res.json(team);
        } else {
          //Invalid team id
          res.status(401).send({
            message: "Invalid team id!",
          });
        }
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
 * deleteTeamById
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     name: deleteTeamById
 *     description: API for deleting a document from MongoDB.
 *     summary: Removes a document from MongoDB.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the document to remove.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Team Document
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.delete("/teams/:id", async (req, res) => {
  try {
    const myId = req.params.id;

    Team.findByIdAndDelete({ _id: myId }, function (err, team) {
      console.log("Made it here");
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        if (team) {
          console.log(team);
          res.json(team);
        } else {
          res.status(401).send({
            message: "Invalid Team Id!",
          });
        }
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
 * assignPlayerToTeam
 * @openapi
 * /api/teams/{id}/players :
 *   post:
 *     tags:
 *       - Teams
 *     name: assignPlayerToTeam
 *     description: API for updating an existing document in MongoDB.
 *     summary: Updates a document in MongoDB.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: id to filter the collection by.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: player information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - salary
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Player added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/teams/:id/players", async (req, res) => {
  try {
    const myId = req.params.id;

    console.log(`myId: ${myId}`);

    Team.findOne({ _id: myId }, function (err, team) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        const newPlayer = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          salary: req.body.salary,
        };
        team.players.push(newPlayer);
        team.save();
        res.json(team);
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
