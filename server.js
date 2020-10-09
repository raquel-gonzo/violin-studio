const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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
