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

mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })

.then(() => console.log('Database is connected.'))
.catch(err => console.log('Something went wrong when connecting to the DB ', err));

// set up routes
app.use("/students", require("./server/routes/tutorial.routes"));
app.use("/tasks", require("./server/routes/task.routes"));

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});
