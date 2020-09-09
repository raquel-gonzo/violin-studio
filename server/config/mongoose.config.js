const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/violin_studio_DB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})  
    .then(() => console.log('Database is connected.'))
    .catch(err => console.log('Something went wrong when connecting to the DB ', err));