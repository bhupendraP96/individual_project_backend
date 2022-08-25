const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.static(__dirname + '/photostorage')); // makes photostorage folder public
app.use(cors()); //accepts data from foreign sites
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./database/database");

const userRoute = require("./routes/userRouter");
const photoRoute = require("./routes/photosRouter");
const commentRoute = require('./routes/commentRoute')

app.use(userRoute);
app.use(photoRoute);
app.use(commentRoute);

app.listen(90);