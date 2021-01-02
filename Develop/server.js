const express = require("express");
const path = require("path");
const fs = require("fs");
// const { title } = require("process");
// const { text } = require("express");

const app = express();
const PORT = process.env.PORT || 8080;; 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/notes", function(req, res) {
    return res.json(newNote);
    // return res.json(text);
});

app.get("/api/notes/:id", function(req, res) {
  var chosen = req.params.character;

  console.log(chosen);

  for (var i = 0; i < notes.length; i++) {
    if (chosen === notes[i].routeName) {
      return res.json(notes[i]);
    }
  }

  return res.json(false);
});

app.post("/api/notes", function(req, res) {

  var newNote = req.body;

  console.log(newNote);

  notes.push(newNote);

  res.json(newNote);
});

let data = JSON.stringify(title);

function writeToFile(fileName, data) {
    fs.writeFileSync(`db.json`, data);
}

fs.readFile('db.json', (err, data) => {
    if (err) throw err;
    let newNote = JSON.parse(data);
    console.log(title);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});