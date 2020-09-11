const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;
const jwt = require("jsonwebtoken");
// const studentRoutes = require('./server/routes/student.routes');
const cookieParser = require('cookie-parser');

// const payload = {
//     id: student._id
// }

// const studentToken = jwt.sign(payload, process.env.SECRET_KEY);

require('./server/config/mongoose.config');
require('dotenv').config();

app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./server/routes/student.routes')(app);

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});