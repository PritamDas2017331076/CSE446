const express = require('express')
const router = express.Router();
const Supply = require('../db/supply')
const auth = require('../middleware/auth')

router.use(express.json())

router.route('/').get((req, res) => {
    Supply.find()
        .then(supply => res.json(supply))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/add', async(req, res) => {
    console.log(req.body)
    const list = req.body;
    console.log(list)
    const newSupply = new Supply({ list });

    try {
        await newSupply.save();
        res.status(200).send({ newSupply })
    } catch (e) {
        res.status(400).send(e);
    }
})

router.get('/:id', async(req, res) => {
    try {
        const supply = await Supply.findById({ _id: req.params.id })
        if (!supply)
            return res.status(404).send()
        res.status(200).send(supply)
    } catch (e) {
        res.status(400).send()
    }
})

router.patch('/:id', async(req, res) => {
    try {
        console.log(req.body, req.params.id)
        const supply = await Supply.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        console.log('this is mine', supply)
        if (!supply)
            return res.status(404).send()
        res.status(200).send(supply)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const supply = await Supply.findByIdAndDelete(req.params.id)
        if (!supply)
            return res.status(404).send()
        res.status(200).send(supply)

    } catch (e) {
        res.status(400).send()
    }
})
module.exports = router