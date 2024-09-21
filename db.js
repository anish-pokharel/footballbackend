const mongoose = require('mongoose');
const mongodb = require('mongodb');
require('dotenv').config();

// Access environment variables
const mongoURI = process.env.MONGODB_URI; 

mongoose
.connect(mongoURI, {
   useNewUrlParser: true, 
   useUnifiedTopology: true, 
   family: 4,
 })
 .then(() => {
    console.log('Database is connected');
 })
 .catch((error) => {
    console.log('Error', error);
 });
