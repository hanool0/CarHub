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

module.exports = router;