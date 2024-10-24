const express = require('express');
const app = express();
const api = require('./users.js')

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

app.post('/display-input', (req, res) => {
    const input = req.body.hello;
    res.render('input', { input });
});
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/input', (req, res) => {
    res.render('input');
});

const http = require('http').createServer(app);
const io = require('socket.io')(http);


io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for 'message' events from clients
    socket.on('message', (data) => {
        let { message, username } = data;
        
        console.log('Received message:', data);

        // Emit 'otherMessage' to all clients, including the sender
        io.emit('otherMessage', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const port = 3000;
http.listen(port, () => {
    console.log(`http://localhost:3000`);
});