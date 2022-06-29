const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplySchema = new Schema({
    list: [{
        _id: false,
        desc: String,
        piece: Number
    }]

}, {
    timestamp: true
});

const Supply = mongoose.model('Supply', supplySchema)

module.exports = Supply