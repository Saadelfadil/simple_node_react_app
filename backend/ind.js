const express = require('express')
const bodyParser = require('body-parser');
const { randomInt } = require('crypto');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use('/users', () => {console.log("I am the user")});

let users = [];

const createUser = (req, res) => {
    const newUser = req.body;
    users.push({ ...newUser, id: randomInt(100) });
    res.send(`Hey welcome ${req.body.company} you are now in DATABASE.`);
};

app.post('/add', (req, res) => createUser)

app.post('/update/:id', (req, res) => {
    let id = req.params.id;
    res.send(`Hey Delete and my id is : ${id}`)
})

app.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    res.send(`Hey Update and my id is : ${id}`)
})

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));