const express = require('express');
const app = express();

const indexRouter = require('./routes/login.js');

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/', indexRouter);

// app.get('/', (req, res) => {
//     res.render('login', { title: 'login' });
// });
app.listen(3000, () => {
    console.log('Server started on port 3000: http://localhost:3000/');
});

app.post('/display-input', (req, res) => {
    const input = req.body.hello;
    res.render('input', { input });
});
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/input', (req, res) => {
    res.render('input');
});
