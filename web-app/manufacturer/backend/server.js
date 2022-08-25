const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connection established")
})

const userRouter = require('./api/user');
app.use('/users', userRouter);


const supplyRouter = require('./api/supply');
app.use('/supplies', supplyRouter);



app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
})