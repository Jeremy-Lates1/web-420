/*
============================================
; Title:  lates-session-routes.js
; Author: Jeremy Lates
; Date:   02-16-2024
; Code adapted from: https://github.com/buwebdev/web-420/blob/master/routes/password-routes.js   
;===========================================
*/
const express = require("express");
const router = express.Router();
const User = require("../models/lates-user");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

/**
 * signup
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - UserName
 *     name: signup
 *     summary: signup user
 *     requestBody:
 *       description: Signup information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *             properties:
 *               userName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Registered user
 *       '401':
 *         description: userName already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/signup", async (req, res) => {
  try {
    User.findOne({ userName: req.body.userName }, function (err, user) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        if (!user) {
          // User does not exist.  Add user
          let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // salt/hash the password

          let newRegisteredUser = {
            userName: req.body.userName,
            password: hashedPassword,
            emailAddress: req.body.emailAddress,
          };

          User.create(newRegisteredUser, function (err, newUser) {
            if (err) {
              console.log(err);
              res.status(501).send({
                message: `MongoDB Exception: ${err}`,
              });
            } else {
              console.log(newUser);
              res.json(newUser);
            }
          });
        } else {
          // User already exists. Do not add.
          res.status(401).send({
            message: "Username is already in use!",
          });
        }
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e}`,
    });
  }
});

/**
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - UserName
 *       - password
 *     name: login
 *     summary: login user
 *     requestBody:
 *       description: login information
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
 *
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Invalid username and/or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/login", async (req, res) => {
  try {
    User.findOne({ userName: req.body.userName }, function (err, user) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        if (user) {
          // User does not exist.  User can log in if correct password.
          let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );

          if (passwordIsValid) {
            //Password is valid and user can log in
            res.status(200).send({
              message: "User logged in...",
            });
          } else {
            //Password is invalid and user cannot log in
            res.status(401).send({
              message: "Invalid username and/or password!",
            });
          }
        } else {
          // User does not exist and cannot be logged in.
          res.status(401).send({
            message: "Invalid username and/or password!",
          });
        }
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e}`,
    });
  }
});

module.exports = router;
