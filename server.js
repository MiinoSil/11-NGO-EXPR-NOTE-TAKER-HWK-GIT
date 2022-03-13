// Call upon or import dependencies.
const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db")

// // Establish routes to HTML
// const apiRoutes = require("./routes/apiRoutes");
// const HTMLRoutes = require("./routes/HTMLRoutes");

// Call upon express middleware.
const app = express();

// Port is for localhost and HEROKU
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
})

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

app.route("/api/notes")
    .get(function (req, res) {
        res.json(db);
    })
    .post(function (req, res) {
        let jsonFilePath = path.join(__dirname, "/db/db.json");
        let newNote = req.body;

        let oldestNote = 99;

        for (let i = 0; i < db.length; i++) {
            let note = db[i];
            if (note.id > oldestNote) {
                oldestNote = note.id;
            }
        }

        newNote.id = oldestNote + 1;

        db.push(newNote)

        fs.writeFile(jsonFilePath, JSON.stringify(db), function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("Note saved.")
        });
        res.json(newNote);
    });

app.delete("/api/notes/:id", function (req, res) {
    let jsonFilePath = path.join(__dirname, "/db/db.json");

    for (let i = 0; i < database.length; i++) {

        if (database[i].id == req.params.id) {

            database.splice(i, 1);
            break;
        }
    }

    fs.writeFileSync(jsonFilePath, JSON.stringify(database), function (err) {

        if (err) {
            return console.log(err);
        } else {
            console.log("Your note was deleted!");
        }
    });
    res.json(database);
});


// Calls server to listen to PORT.
app.listen(PORT, function() {
    console.log(`Listening on PORT ${PORT}`);
});

