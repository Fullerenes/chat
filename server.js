const fs = require('fs');
const path = require('path');
const express = require('express');
const md5 = require('md5');
const bodyParser = require('body-parser');
const socketServer = require('socket.io');
const http = require('http');
const cookieParser = require('cookie-parser');

const messages = require('./api/messages');
const users = require('./api/users');
const rooms = require('./api/rooms');
const app = express();


let nextUserId = Object.keys(users).length;

app.set('port', (process.env.PORT || 8080));

//app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

var serve = http.createServer(app);
var io = socketServer(serve);

function makeAnswer(data = {}, errorMessage = '') {
    let error = { error: false, errorMessage: '' };
    console.log(errorMessage);
    if (errorMessage) {
        error = {
            ...error,
            error: true,
            errorMessage
        }
    }
    console.log({ data, error });
    return { data, error };
}

app.use(express.static(path.join(__dirname, 'build')));
// Handle React routing, return all requests to React app
// app.get('/', function (req, res) {
//     console.log(req, res);
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

serve.listen(app.get('port'), () => { console.log("+++Gethyl Express Server with Socket Running!!!") })

/***************************************************************************************** */
/* Socket logic starts here																   */
/***************************************************************************************** */
const connections = [];
io.on('connect', function (socket) {
    let index;
    console.log("Connected to Socket!!" + socket.id)
    connections.push(socket);


    // io.clients((error, clients) => {
    //     if (error) throw error;
    //     console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
    // });
    socket.on('rooms', () => {
        const event = { payload: rooms.map(room => { const roomClient = Object.assign({}, room); delete roomClient.password; return roomClient }) };
        socket.emit('rooms', event);
    });

    socket.on('createRoom', data => {

    });
    socket.on('disconnect', () => {
        index = connections.indexOf(socket);
        connections.splice(index, 1);
        console.log('Disconnected - ' + socket.id);
    });
    socket.on('forceDisconnect', () => {
        console.log('forceDisconnect - ' + socket.id);
        socket.disconnect();
    });
    socket.on('message', (message) => {
        console.log(message);
        const roomId = parseInt(message.roomId);
        //const room = rooms.filter(room => room.id === roomId);
        const nextMessageId = messages[roomId].length;
        const newMessage = {
            "id": nextMessageId,
            "nickname": message.nickname,
            "time": Date.now(),
            "message": message.message,
            "owner": message.userId
        }
        const event = {
            payload: {
                roomId,
                message: newMessage
            }
        }
        messages[roomId].push(newMessage);
        fs.writeFile("./api/messages.json", JSON.stringify(messages), function (err) {
            if (err) {
                return console.log(err);
            }
        });
        io.sockets.emit('newMessage', event);
    });
    socket.on('fetchMessages', (addData) => {
        io.emit('messagesFetched', messages);
    });
    socket.on('join', (roomName) => {
        socket.join(roomName, () => {
            console.log('ROOM CLIENTS');
            io.in(roomName).clients((err, clients) => {
                console.log(clients);
                // clients will be array of socket ids , currently available in given room
            });
        });
    });
    // app.get('/api/messages', (req, res) => {
    //     res.json(messages);
    // });
    // var cursor = todoModel.find({}, "-_id itemId item completed", (err, result) => {
    //     if (err) {
    //         console.log("---Gethyl GET failed!!")
    //     }
    //     else {
    //         socket.emit('initialList', result)
    //         console.log("+++Gethyl GET worked!!")
    //     }
    // })
    // // 		.cursor()
    // // cursor.on('data',(res)=> {socket.emit('initialList',res)})

    // socket.on('addItem', (addData) => {
    //     var todoItem = new todoModel({
    //         itemId: addData.id,
    //         item: addData.item,
    //         completed: addData.completed
    //     })

    //     todoItem.save((err, result) => {
    //         if (err) { console.log("---Gethyl ADD NEW ITEM failed!! " + err) }
    //         else {
    //             // connections.forEach((currentConnection)=>{
    //             // 	currentConnection.emit('itemAdded',addData)
    //             // })
    //             io.emit('itemAdded', addData)

    //             console.log({ message: "+++Gethyl ADD NEW ITEM worked!!" })
    //         }
    //     })
    // })

    // socket.on('markItem', (markedItem) => {
    //     var condition = { itemId: markedItem.id },
    //         updateValue = { completed: markedItem.completed }

    //     todoModel.update(condition, updateValue, (err, result) => {
    //         if (err) { console.log("---Gethyl MARK COMPLETE failed!! " + err) }
    //         else {
    //             // connections.forEach((currentConnection)=>{
    //             // 	currentConnection.emit('itemMarked',markedItem)
    //             // })
    //             io.emit('itemMarked', markedItem)

    //             console.log({ message: "+++Gethyl MARK COMPLETE worked!!" })
    //         }
    //     })
    // })

});
// app.get('/api/messages', (req, res) => {
//     res.json(messages);
// });
app.post('/api/login', (req, res) => {
    let login = req.body.login;
    let password = req.body.password;
    let save = false;
    console.log('LOGIN:', login, md5(password));
    const userIndex = users.findIndex(user => (user.login === login && user.password === md5(password)));
    if (userIndex >= 0) {
        const nickname = users[userIndex].nickname;
        const session = md5(`${Math.round(Math.random() * 100000)}${nickname}`);
        users[userIndex].session = session;
        const userId = users[userIndex].userId;
        save = true;
        const answer = makeAnswer({ nickname, userId, session });
        res.cookie('session', session, { maxAge: 900000, httpOnly: true });
        res.json(answer);
    } else {
        const answer = makeAnswer({}, "User not Found or password doesn't match");
        res.json(answer);
    }
    if (save) {
        fs.writeFile("./api/users.json", JSON.stringify(users), function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }
});
app.post('/api/user', (req, res) => {
    console.log(req.cookies);
    const session = req.cookies.hasOwnProperty('session') ? req.cookies.session : null;
    const newName = req.body.nickname;
    console.log('SESSION:', session);
    const userIndex = users.findIndex(user => user.session === session);
    if (userIndex >= 0) {
        if (newName) {
            users[userIndex].nickname = newName;
        }
        const nickname = users[userIndex].nickname;
        const userId = users[userIndex].userId;
        const answer = makeAnswer({ nickname, userId });
        res.json(answer);
    } else {
        const answer = makeAnswer({}, "Session doesn't exist user");
        res.json(answer);
    }
});
app.post('/api/logout', (req, res) => {
    const session = req.cookies.hasOwnProperty('session') ? req.cookies.session : null;
    const userIndex = users.findIndex(user => user.session === session);
    res.cookie('session', '', { maxAge: 0, httpOnly: true });
    if (userIndex > 0) {
        users[userIndex].session = session;

    }
    const answer = makeAnswer({});
    res.json(answer);
});
app.post('/api/registration', (req, res) => {
    const login = req.body.login;
    const password = md5(req.body.password);
    let save = false;
    console.log('REGISTRATION:', login, md5(password));
    const userIndex = users.findIndex(user => (user.login === login));
    if (userIndex >= 0) {
        const answer = makeAnswer({}, "This Login Already Taken");
        res.json(answer);
    } else {
        const nickname = `User${Math.round(Math.random() * 100000)}`;
        const session = md5(`${Math.round(Math.random() * 100000)}${nickname}`);
        const userId = nextUserId++;
        const user = { nickname, session, userId, login, password };
        res.cookie('session', session, {
            maxAge: 86400000, httpOnly: true
        });
        save = true;
        users.push(user);
        const answer = makeAnswer({ nickname, userId });
        res.json(answer);
    }
    if (save) {
        fs.writeFile("./api/users.json", JSON.stringify(users), function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }
});
// app.post('/api/messages', (req, res) => {
//     const message = {
//         id: nextMessageId++,
//         message: req.body.message,
//         nickname: req.body.nickname,
//         time: Date.now(),
//         owner: req.body.userId
//     };
//     messages.push(message);
//     fs.writeFile("./api/messages.json", JSON.stringify(messages), function (err) {
//         if (err) {
//             return console.log(err);
//         }
//     });
//     res.json(message);
// });

// app.put('/api/messages/:id', (req, res) => {
//     const token = req.body.token;
//     const message = req.body.message;
//     const userIndex = users.findIndex(user => user.token === token);
//     if (userIndex >= 0) {
//         const userId = users[userIndex].userId;
//         if (userId) {
//             const messageIndex = messages.findIndex(message => (message.id === req.params.id && message.owner === userId));
//             if (messageIndex >= 0) {
//                 if (message) {
//                     messages[messageIndex].message = message;
//                 } else {
//                     messages.splice(messageIndex, 1);
//                 }
//                 return res.sendStatus(204);
//             }
//         }
//     }
//     return res.sendStatus(404);
// });
