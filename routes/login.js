require('dotenv/config.js');

const User = require('../src/mongodb.js') //folder redirection attack
const getCarFunction = require('../users.js')
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const mongoURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cags2-storage.pim76.mongodb.net/?retryWrites=true&w=majority&appName=cags2-storage`;
const bcrypt = require('bcrypt');
mongoose.connect(mongoURI)
    .then((data) => {
        console.log('connected to mongodb')
    })
    .catch(err => console.log(err));

router.get('/login', (req, res) => {
    res.render('login', { title: "login" });
})
router.get('/signup', (req, res) => {
    res.render('signup', { title: "signup" });
})
router.get('/home', (req, res) => {
    let passedVariable = JSON.parse(req.query.valid);

    res.render('home', { title: "home", passedVariable });
})
router.get('/noobie', (req, res) => {
    let passedVariable = null;
    if (req.query && req.query.valid) {
        passedVariable = JSON.parse(req.query.valid)||null;
    }

    res.render('noobie', { title: "noobie", passedVariable });
})
router.get('/getCar', async (req, res) => {
    let model = req.query.model
    let getCar = await getCarFunction(model)
    res.status(200).json(getCar)
})
router.post('/login', async (req, res) => {
    console.log(JSON.stringify(req.body))             //turns json data into string 
    let { username, password } = req.body            //gets username and password into req.body.username & req.body.password
    let successLogin = JSON.stringify(await loginCheck(username, password))
    if (successLogin.status) {
        res.status(200).redirect('/home?valid=' + successLogin);
    }
    else {
        res.status(400).json(successLogin)
    }

})
router.post('/signup', async (req, res) => {
    let { username, password, confirmPassword } = req.body
    let successSignup = JSON.stringify(await signup(username, password, confirmPassword))
    console.log(JSON.stringify(req.body))
    if (successSignup.status) {
        res.status(200).redirect('/noobie?valid=' + successSignup);
    }
    else {
        res.status(400).json(successSignup)
    }

})

module.exports = router;

async function signup(username, password, confirmPassword) {
    //we need to check for new username and password = confirmPassword
    const existingUser = await User.findOne({ username: username }); //goes into mongodb and finds user data (username: username)
    if (existingUser) {
        return { status: false, message: "Mango already exists within the still water" }
    }
    if (password != confirmPassword) {
        return { status: false, message: "Password isn't the same" }
    }
    await User.create({ username: username, password: password }); //creates the user data in mongodb
    return { status: true, message: "Created account", username } // returns status, message, and username
}
async function loginCheck(username, password) {
    const getUser = await User.findOne({ username: username });
    if (!getUser) {
        return { status: false, message: "Unknown username" }
    }
    if (await bcrypt.compare(password, getUser.password)) { //compares passwords with fetched password in database from getUser and returns true or false 
        return { status: true, message: "Successfully logged in!" }
    }
    else {
        return { status: false, message: "Password isn't the same" }
    }

}