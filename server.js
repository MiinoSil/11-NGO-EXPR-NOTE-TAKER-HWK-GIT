// Call upon or import dependencies.
const express = require("express");
const path = require("path");
const fs = require("fs");

// Establish routes to HTML
const apiRoutes = require("./routes/apiRoutes");
const HTMLRoutes = require("./routes/HTMLRoutes");

// Call upon express middleware.
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.use("/api", apiRoutes);
app.use("/", HTMLRoutes);

// Calls server to listen to PORT.
app.listen(PORT, function() {
    console.log(`Listening on PORT ${PORT}`);
});

