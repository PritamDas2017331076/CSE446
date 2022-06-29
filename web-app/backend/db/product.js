const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    desc: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamp: true
});

const Product = mongoose.model('Product', productSchema)

module.exports = Product