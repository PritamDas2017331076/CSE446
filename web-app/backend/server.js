const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
let Users = require('./db/user')
let Products = require('./db/product')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

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

const productRouter = require('./api/product');
app.use('/products', productRouter);

const supplyRouter = require('./api/supply');
app.use('/supplies', supplyRouter);



app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
})