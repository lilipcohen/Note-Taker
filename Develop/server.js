const express = require("express");
const path = require("path");
const fs = require("fs");
const { title } = require("process");
const { text } = require("express");

const app = express();
const PORT = 3000; 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/notes", function(req, res) {
    return res.json(title);
    // return res.json(text);
});

app.post("/api/notes", function(req, res) {

  var newNote = req.body;

  console.log(newNote);

  characters.push(newNote);

  res.json(newNote);
});

// app.get("/api/characters/:character", function(req, res) {
//   var chosen = req.params.character;

//   console.log(chosen);

//   for (var i = 0; i < characters.length; i++) {
//     if (chosen === characters[i].routeName) {
//       return res.json(characters[i]);
//     }
//   }

//   return res.json(false);
// });

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});