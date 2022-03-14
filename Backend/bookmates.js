//jshint esversion:6
require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const app = express();

//Import Routes
const authRoute = require ('./routes/auth');
const reviewRoute = require ('./routes/reviews');
const searchRoute = require ('./routes/searchBook');

//Connect to DB
mongoose.connect(process.env.DB_CONNECT,
() => console.log("Connected to database"));

//Middleware
app.use(express.json());

//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/review', reviewRoute);
app.use('/api/search', searchRoute);


app.listen(3000, () => console.log('Listening on port: 3000'));