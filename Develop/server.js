const express = require("express");
const path = require("path");
const fs = require("fs");
const notes = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 8000; 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});


app.get("/api/notes", function (req, res) {
  console.log(notes)
  res.json(notes)
});

app.delete("/api/notes/:id", function(req, res) {
  var chosenId = req.params.id;
  
  const noteIndex = notes.findIndex(note => note.id === chosenId)
  
  if(noteIndex !== -1) {
    notes.splice(noteIndex,1)
    
    writeToFile('./db/db.json', JSON.stringify(notes))
  }
  
  return res.json(true);
});

app.post("/api/notes", function(req, res) {
  
  /**
   * {
   *   title: 'Test note',
   *   text: 'Test details',
   *   id: '1245292'
   * }
   */
  var newNote = {
    ...req.body,
    id: Date.now().toString()
  };
  
  notes.push(newNote);
  
  writeToFile('./db/db.json', JSON.stringify(notes))
  
  res.json(newNote);
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

function writeToFile(fileName, data) {
  fs.writeFileSync(fileName, data);
}

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});