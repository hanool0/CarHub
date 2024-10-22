const getCarFunction = require('../users.js')
const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login', {title: "login"});
})
router.get('/', (req, res) => {
    res.render('register', {title: "login"});
})
router.get('/home', (req, res) => {
    res.render('home', {title: "login"});
})
router.get('/getCar', async (req, res) => {
    let model = req.query.model
    let getCar = await getCarFunction(model)
    res.status(200).json(getCar)
})

module.exports = router;