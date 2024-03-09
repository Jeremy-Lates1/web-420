"use strict";
/* 
  Name: Jeremy Lates 
  Date: 03/07/2024
  Code Attributions:  Professor Krasso class documentation 
  */

//Add two teams
let celtics = {
  teamId: "1",
  name: "Celtics",
  mascot: "Lucky",
  players: [
    {
      firstName: "Joy",
      lastName: "Freeman",
      salary: 100,
    },
    {
      firstName: "Jordan",
      lastName: "Lates",
      salary: 200,
    },
  ],
};

db.teams.insertOne(celtics);

let bucks = {
  teamId: "2",
  name: "Bucks",
  mascot: "Moose",
  players: [
    {
      firstName: "Erin",
      lastName: "Freeman",
      salary: 300,
    },
    {
      firstName: "Kobe",
      lastName: "Lates",
      salary: 400,
    },
  ],
};

db.teams.insertOne(bucks);
