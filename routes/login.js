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
router.post('/login', (req,res)=>{
    console.log(req.body.username1);
    res.sendStatus(200); 
    
})
module.exports = router;