const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

//set up express 
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

const PORT = process.env.PORT || 8000;   // environment variable. 

// set up mongoose
require('./server/config/mongoose.config');
mongoose.set('useFindAndModify', false);


// set up routes
app.use("/students", require("./server/routes/student.routes"));

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});

// this needs to go last since we're using *
// https://stackoverflow.com/questions/51866714/react-router-routes-dont-work-when-deployed-to-heroku
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get("/*", function(req, res) {
        res.sendFile(path.join(__dirname, "client/build/index.html"));
    });
}