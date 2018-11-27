const fs = require('fs');
const path = require('path');
const express = require('express');
const md5 = require('md5');
const bodyParser = require('body-parser');

const messages = require('./messages');
const users = require('./users');
const app = express();

let nextMessageId = Object.keys(messages).length;
let nextUserId = Object.keys(users).length;

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/messages', (req, res) => {
    res.json(messages);
});
app.post('/api/user', (req, res) => {
    let token = req.body.token;
    let newName = req.body.nickname;
    let save = false;
    const userIndex = users.findIndex(user => user.token === token);
    if (userIndex > 0) {
        if (newName) {
            users[userIndex].nickname = newName;
            save = true;
        }
        const nickname = users[userIndex].nickname;
        const userId = users[userIndex].userId;
        const user = {
            nickname, userId
        };
        res.json(user);
    } else {
        const nickname = `User${Math.round(Math.random() * 100000)}`;
        token = md5(`${Math.round(Math.random() * 100000)}${nickname}`);
        const userId = nextUserId++;
        const user = {
            userId, token, nickname
        };
        users.push(user);
        save = true;
        res.json(user);
    }
    if (save) {
        fs.writeFile("./users.json", JSON.stringify(users), function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }
});
app.post('/api/messages', (req, res) => {
    const message = {
        id: nextMessageId++,
        message: req.body.message,
        nickname: req.body.nickname,
        time: Date.now(),
        owner: req.body.userId
    };
    messages.push(message);
    fs.writeFile("./messages.json", JSON.stringify(messages), function (err) {
        if (err) {
            return console.log(err);
        }
    });
    res.json(message);
});

app.put('/api/messages/:id', (req, res) => {
    const token = req.body.token;
    const message = req.body.message;
    const userIndex = users.findIndex(user => user.token === token);
    if (userIndex >= 0) {
        const userId = users[userIndex].userId;
        if (userId) {
            const messageIndex = messages.findIndex(message => (message.id === req.params.id && message.owner === userId));
            if (messageIndex >= 0) {
                if (message) {
                    messages[messageIndex].message = message;
                } else {
                    messages.splice(messageIndex, 1);
                }
                return res.sendStatus(204);
            }
        }
    }
    return res.sendStatus(404);
});

app.listen(app.get('port'), () => console.log(`Server is listening: http://localhost:${app.get('port')}`));