const express = require('express');
const app = express();
const connectdb = require('./db');
const cors = require('cors');

// const path = require('path'); 
const matchData= require('./routes/matchRoutes')


app.use(express.json());
app.use(cors());
app.use(matchData);


app.listen(3200,()=>{
    console.log('LocalHost is connected');
})