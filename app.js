/*
============================================
; Title:  app.js
; Author: Jeremy Lates
; Date:  01-11-2023
; Comments: Source is adapted from Professor Krasso assignment handouts
; Code adapted from https://github.com/buwebdev/web-420/blob/master/app.js
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

app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * MongoDB Atlas connection string
 */

const conn =
  "mongodb+srv://web420_user:s3cret@bellevueuniversity.gxluysn.mongodb.net/web420DB?retryWrites=true&w=majority";
mongoose
  .connect(conn, {
    promiseLibrary: require("bluebird"),
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`Connection to web420DB on MongoDB Atlas successful`);
  })
  .catch((err) => {
    console.log(`MongoDB Error: ${err.message}`);
  });

/*
    Here we go. APi time
*/

//Composer API routing starts here
const composerAPI = require("./routes/lates-composer-routes");
app.use("/api", composerAPI);

//Persons API routing starts here
const personAPI = require("./routes/lates-person-routes");
app.use("/api", personAPI);

//User API routing starts here
const userAPI = require("./routes/lates-session-routes");
app.use("/api", userAPI);

//Customer API routing starts here
const customerAPI = require("./routes/lates-node-shopper-routes");
app.use("/api", customerAPI);

//Start the server and liston on port 3000
const server = http.createServer(app);
server.listen(PORT, (error) => {
  if (error) {
    return console.error(error);
  } else {
    console.log(`Application started and listening on port  ${PORT}`);
  }
});
