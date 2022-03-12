//jshint esversion:6
const express = require("express");
const cors = require("cors");
var corsOptions = {
    origin: "http://localhost:3000"
};
const jwt = require("jsonwebtoken");
const app = express()

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Connect to db
const db = require("./app/models");
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


app.get("/", (req, res) => {
    res.json({ message: "Welcome to bookmates application." });
  });

app.listen(8000);