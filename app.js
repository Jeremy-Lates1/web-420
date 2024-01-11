/*
============================================
; Title:  app.js
; Author: Jeremy Lates
; Date:  01-11-2023
; Comments: Source is adapted from Professor Krasso assignment handouts
;===========================================
*/

//Set application variables
const express = require("express");

const http = require("http");

const swaggerUi = require("swagger-ui-express");

const swaggerJSDoc = require("swagger-jsdoc");

const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//Set options to be displayed
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Web 420 RESTFul APIs",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"], // files containing annotations for OpenAPI Specification
};

const openapiSpecification = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

//Start the server and liston on port 3000
const server = http.createServer(app);
server.listen(PORT, (error) => {
  if (error) {
    return console.error(error);
  } else {
    console.log(`Application started and listening on port  ${PORT}`);
  }
});
