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
        console.log('mongodb connected')
    })
    .catch(err => console.log("err"));

router.get('/login', (req, res) => {
    res.render('login', { title: "login" });
})
router.get('/signup', (req, res) => {
    res.render('signup', { title: "signup" });
})
router.get('/', (req, res) => {
    let passedVariable = null;
    if (req.query && req.query.valid){
        passedVariable = JSON.parse(req.query.valid);
    }
    res.render('home', { title: "home", passedVariable });
})
router.get('/noobie', (req, res) => {
    let passedVariable = null;
    if (req.query && req.query.valid) {
        passedVariable = JSON.parse(req.query.valid) || null;
    }

    res.render('noobie', { title: "noobie", passedVariable });
})
router.get('/getCar', async (req, res) => {
    let model = req.query.model
    let getCar = await getCarFunction(model)
    res.status(200).json(getCar)
})
router.post('/makeCar', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    updateUser(username, password, req.body.model)
    res.status(200).json({ message: "Everything went fine" })
})
router.post('/login', async (req, res) => {
    let { username, password } = req.body            //gets username and password into req.body.username & req.body.password
    let successLogin = JSON.stringify(await loginCheck(username, password))
    if (JSON.parse(successLogin).status) {
        res.status(200).redirect('/?valid=' + successLogin);

    }
    else {
        res.status(400).json(successLogin)

    }

})
router.post('/signup', async (req, res) => {
    let { username, password, confirmPassword } = req.body
    let successSignup = JSON.stringify(await signup(username, password, confirmPassword))
    if (JSON.parse(successSignup).status) {
        res.status(200).redirect('/noobie?valid=' + successSignup);
    }
    else {
        res.status(400).json(successSignup)
    }

})
router.get('/models', async (req, res) => {
    let username = req.query.username;
    let getUserModel = await User.findOne({ username: username});
    console.log((getUserModel))
    res.status(200).json({ getUserModel: getUserModel.cars, username });
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
    console.log(getUser)
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
async function updateUser(username, inputPassword, newCar) {
    try {
        // Step 1: Find the user by their username or any unique identifier
        const user = await User.findOne({ username });

        if (!user) {
            console.log('User not found');
            return;
        }

        // Step 2: Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(inputPassword, user.password);

        if (!isMatch) {
            console.log('Incorrect password');
            return;
        }

        // Step 3: Update the 'cars' field by adding the new car string to the array
        user.cars.push(newCar);

        // Save the updated user document to the database
        await user.save();

        console.log('User updated successfully');
    } catch (error) {
        console.error('Error updating user:', error);
    }
}