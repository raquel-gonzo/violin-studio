const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })

// const connection = mongoose.connection;
// connection.once('open', () => { console.log('MongoDB Connected'); });
// connection.on('error', (err) => { console.log('MongoDB connection error: ', err); }); 

    .then(() => console.log('Database is connected.'))
    .catch(err => console.log('Something went wrong when connecting to the DB ', err));