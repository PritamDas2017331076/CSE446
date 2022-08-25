const { dblClick } = require('@testing-library/user-event/dist/click');
const express = require('express')
const router = express.Router();
const User = require('../db/user')
const Userb = require('../../bank-app/backend/db/user')
const auth = require('../middleware/auth')

router.use(express.json())
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.get('/me', auth, async(req, res) => {
    try {
        res.status(200).send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})


router.post('/add', async(req, res) => {
    const user = req.body.user;
    const email = req.body.email;
    const accountno = "acountno.";
    const address = "address";
    const mobile = "mobile";
    const password = req.body.password;
    const cart = []

    try {
        User.findOne({ user: user }, function(err, user) {
            console.log(user);
            if (user) console.log('fine one lol')
                /* if (err) return res.redirect('/signupform') */

            if (user) {
                console.log('just stop it')
                console.log('This user is used')
                return
            }
        })

        User.findOne({ email: email }, function(err, user) {
            console.log(user);
            if (user) console.log('fine one lol')
                /* if (err) return res.redirect('/signupform') */

            if (user) {
                console.log('just stop it')
                console.log('This user is used')
                return
            }
        })
    } catch {
        console.log('user is used')
    }

    const newUser = new User({ user, email, accountno, address, mobile, password });
    console.log(newUser)

    try {
        const token = await newUser.generateAuthToken();
        console.log('token', token)
        res.status(200).send({ newUser, token })
    } catch (e) {
        res.status(400).send(e);
    }
})

router.route('/login').post(async(req, res) => {
    try {
        const userr = await User.findByCredentials(req.body.user, req.body.password)
        const token = await userr.generateAuthToken()
        console.log(userr)
        res.status(200).send({ userr, token })
    } catch (e) {
        res.status(400).json(e)
    }
})

router.get('/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
            //req.user.tokens = []
        await req.user.save();
        res.status(200).send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/:id', async(req, res) => {
    console.log(req.params)
    try {
        const user = await User.findById(req.params.id)
        if (!user)
            return res.status(404).send()
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.patch('/:id', async(req, res) => {
    try {
        const userr = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!userr)
            return res.status(404).send()
        res.status(200).send(userr)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.patch('/addcart/:id', async(req, res) => {
    let arr = []
    try {
        const user = await User.findById({ _id: req.params.id })
        console.log(user)
        if (!user)
            return res.status(404).send()
        arr = user.cart
        console.log('arr', arr)
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
    console.log(req.body)
    arr.push(req.body)
    const chg = { cart: arr }



    try {
        const user = await User.findByIdAndUpdate(req.params.id, chg, { new: true, runValidators: true })
        if (!user)
            return res.status(404).send()
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


router.delete('/:id', async(req, res) => {
    try {
        const userr = await User.findByIdAndDelete(req.params.id)
        if (!userr)
            return res.status(404).send()
        res.status(200).send(userr)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

module.exports = router;