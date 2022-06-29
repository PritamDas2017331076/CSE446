const express = require('express')
const router = express.Router();
const Product = require('../db/product')
const auth = require('../middleware/auth')

router.use(express.json())

router.route('/').get((req, res) => {
    Product.find()
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/add', async(req, res) => {
    const desc = req.body.desc;
    const price = req.body.price;
    console.log(desc, price)
    const newProduct = new Product({ desc, price });

    try {
        await newProduct.save();
        res.status(200).send({ newProduct })
    } catch (e) {
        res.status(400).send(e);
    }
})

router.get('/:id', async(req, res) => {
    try {
        const product = await Product.findById({ _id: req.params.id })
        if (!product)
            return res.status(404).send()
        res.status(200).send(product)
    } catch (e) {
        res.status(400).send()
    }
})

router.patch('/:id', async(req, res) => {
    try {
        console.log(req.body, req.params.id)
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!product)
            return res.status(404).send()
        res.status(200).send(product)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product)
            return res.status(404).send()
        res.status(200).send(product)

    } catch (e) {
        res.status(400).send()
    }
})
module.exports = router