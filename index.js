const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuidv1 = require('uuid/v1');

const fs = require("fs");
var loged = false;

const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

//create
app.post("/films", (req, res) => {
  const filmsList = readJSONFile();
  const newFilm = req.body;
  newFilm.id = uuidv1();
  const newFilmList = [...filmsList, newFilm];
  writeJSONFile(newFilmList);
  res.json(newFilm);
});

//Read One
app.get("/films/:id", (req, res) => {
  const filmsList = readJSONFile();
  const id = req.params.id;
  let idFound = false;
  let foundFilm;

  filmsList.forEach(film => {
    if (id == film.id) {
      idFound = true;
      foundFilm = film
    }
  });

  if (idFound) {
    res.json(foundFilm);
  } else {
    res.status(404).send(`Film ${id} was not found`);
  }
});

app.post("/sign-up", (req, res) => {
  let signData = req.body;
  const userList = readUsers();
  const newUser = req.body;
  newUser.id = uuidv1();
  const newUserList = [...userList, newUser];
  writeUsers(newUserList);
  res.json(newUser);
});


app.post("/login", (req, res) => {
  admin = false;
  loged = false;
  let logData = req.body;
  {
    let users = readUsers();
    let found = 0;
    for (let i = 0 ; i < users.length; i++)
    {
      if (logData.username == users[i].username && logData.password == users[i].password)
        found = 1;
    }
    if (found == 1)
      loged = true;
    else 
      loged = false;
  }
  res.json("ok");

});

app.get("/login2", (req, res) => {
  if (loged == true)
    res.json("loged");
  else
    res.json("not loged");

});

//Read all
app.get("/films", (req, res) => {
  const filmsList = readJSONFile();
  res.json(filmsList);
});

//Update
app.put("/films/:id", (req, res) => {
  let filmsList = readJSONFile();
  let id = req.params.id;
  let newFilm = req.body;
  newFilm.id = id;
  idFound = false;

  const newFilmsList = filmsList.map((film) => {
     if (film.id == id) {
       idFound = true;
       return newFilm
     }
    return film
  })
  
  writeJSONFile(newFilmsList);

  if (idFound) {
    res.json(newFilm);
  } else {
    res.status(404).send(`Film ${id} was not found`);
  }

});

//Delete
app.delete("/films/:id", (req, res) => {
    const filmsList = readJSONFile();
    const id = req.params.id;
    const newFilmsList = filmsList.filter((film) => film.id != id)
  
    if (filmsList.length !== newFilmsList.length) {
      res.status(200).send(`Film ${id} was removed`);
      writeJSONFile(newFilmsList);
    } else {
      res.status(404).send(`Film ${id} was not found`);
    }
  });

// Functia de citire din fisierul db_filme.json
function readJSONFile() {
  return JSON.parse(fs.readFileSync("db_filme.json"))["films"];
}
// Functia de citire din fisierul db_utilizatori.json
function readUsers() {
  return JSON.parse(fs.readFileSync("db_utilizatori.json"))["users"];
}

// Functia de scriere in fisierul db_filme.json
function writeJSONFile(content) {
  fs.writeFileSync(
    "db_filme.json",
    JSON.stringify({ films: content }),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}


// Functia de scriere in fisierul db_utilizatori.json
function writeUsers(content) {
  fs.writeFileSync(
    "db_utilizatori.json",
    JSON.stringify({ users: content }),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

app.use(express.static('public'));

// Pornim server-ul
app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);