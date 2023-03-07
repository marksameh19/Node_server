const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("build"));
const port = process.env.PORT || 3001;

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  const note = req.body;
  note.id = notes.length + 1;
  if (!req.body.content) {
    res.status(400).json({
      error: "content missing",
    });
  }
  notes.push(note);
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id == id);
  if (note) res.json(note);
  else res.status(400).end();
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id != id);
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server running on port ${port} http://localhost:3001/`);
});
