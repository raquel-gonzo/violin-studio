const mongoose = require('mongoose');

    mongoose.connect(
        process.env.MONGODB_CONNECTION_STRING,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

    .then(() => console.log('Database is connected.'))
    .catch(err => console.log('Something went wrong when connecting to the DB ', err));