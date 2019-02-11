const fs = require('fs');
const _ = require('lodash');
const express = require('express');
const md5 = require('md5');
const bodyParser = require('body-parser');
const socketServer = require('socket.io');
const http = require('http');
const cookie = require('cookie');
const cookieParser = require('cookie-parser');

const messages = require('./api/messages');
const users = require('./api/users');
const rooms = require('./api/rooms');
const app = express();

// var expressMongoDb = require('express-mongo-db');
// app.use(expressMongoDb('mongodb://localhost/test'));
// var dbo = app.db.db("chat");
// dbo.collection("users").find().limit(5).toArray(function (err, result) {
//     if (err) throw err;
//     console.log(result);
//     app.db.close();
// });
let nextUserId = Object.keys(users).length;

app.set('port', (process.env.PORT || 5000));

//app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
var serve = http.createServer(app);
var io = socketServer(serve);

function makeAnswer(data = {}, errorMessage = '') {
    let error = {
        error: false,
        errorMessage: ''
    };
    if (errorMessage) {
        error = {
            ...error,
            error: true,
            errorMessage
        }
    }
    return {
        data,
        error
    };
}

function Message(messages, {
    nickname = 'Service',
    userId = 0,
    message = '',
    roomId = 0
}, service = false) {
    if (service) {
        nickname = 'Service';
        userId = 0;
    }
    if (!messages[roomId]) {
        messages[roomId] = [];
    }
    const nextMessageId = messages[roomId].length;
    const newMessage = {
        "id": nextMessageId,
        "nickname": nickname,
        "time": Date.now(),
        "message": message,
        "owner": userId
    }
    messages[roomId].push(newMessage);
    fs.writeFile("./api/messages.json", JSON.stringify(messages), function (err) {
        if (err) {
            return console.log(err);
        }
    });
    return newMessage;
}
const userSessionCheck = (users, session) => {
    const userIndex = users.findIndex(user => user.session === session);
    return userIndex;
}
const getUserData = (users, userIndex) => {
    const nickname = users[userIndex].nickname;
    const userId = users[userIndex].userId;
    const nameChanged = users[userIndex].userId;
    return {
        nickname,
        userId,
        nameChanged
    }
}
// app.use(express.static(path.join(__dirname, 'build')));
// //Handle React routing, return all requests to React app
// app.get('/*', function (req, res) {
//     console.log(req, res);
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

serve.listen(app.get('port'), () => {
    console.log(`+++Gethyl Express Server with Socket Running!!! at ${app.get('port')}`)
})

/***************************************************************************************** */
/* Socket logic starts here																   */
/***************************************************************************************** */
const connections = [];
io.on('connect', function (socket) {
    const cookies = cookie.parse(socket.request.headers.cookie);
    const session = cookies.session ? cookies.session : null;
    const userIndex = userSessionCheck(users, session);
    if (userIndex < 0) {
        socket.disconnect('unauthorized');
    } else {
        const {
            nickname,
            userId
        } = getUserData(users, userIndex);
        socket.nickname = nickname;
        socket.userId = userId;
    }
    let index;
    console.log("Connected to Socket!!" + socket.id)
    connections.push(socket);


    // io.clients((error, clients) => {
    //     if (error) throw error;
    //     console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
    // });
    socket.on('changeNickname', newNickname => {
        const cookies = cookie.parse(socket.request.headers.cookie);
        const session = cookies.session ? cookies.session : null;
        const userIndex = userSessionCheck(users, session);
        if (userIndex > 0 && newNickname) {
            const {
                nickname,
                userId
            } = getUserData(users, userIndex);
            users[userIndex].nickname = newNickname;
            socket.nickname = newNickname;
            const event = {
                payload: {
                    userId,
                    nickname: newNickname
                }
            }
            console.log('Emit nicknameChanged ##START##');
            console.log(event);
            console.log('Emit nicknameChanged ##END##');
            socket.emit('nicknameChanged', event);
            let rooms = Object.keys(socket.rooms);
            rooms = rooms.filter((room) => room !== socket.id);
            rooms.map(
                room => {
                    const roomId = room;
                    const newMessage = Message(messages, {
                        roomId,
                        message: `${nickname} change name to ${newNickname}`
                    });
                    const event = {
                        payload: {
                            roomId,
                            userId,
                            nickname: newNickname,
                            message: newMessage
                        }
                    }
                    console.log('Emit newMessage ##START##');
                    console.log(event);
                    console.log('Emit newMessage ##END##');
                    return io.to(roomId).emit('newMessage', event);
                }
            );

            fs.writeFile("./api/users.json", JSON.stringify(users), function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        }
    });
    socket.on('rooms', () => {
        const event = {
            payload: rooms.map(room => _.pick(room, ["id", "name", "owner", "private", "created", "currentUsers"]))
        };
        console.log('Emit rooms ##START##');
        console.log(event);
        console.log('Emit rooms ##END##');
        socket.emit('rooms', event);
    });
    socket.on('users', () => {
        const sockets = io.sockets.connected;
        const users = [];
        for (let socketId in sockets) {
            users.push({
                nickname: sockets[socketId].nickname,
                userId: sockets[socketId].userId
            });
        }
        const event = {
            payload: {
                users
            }
        }
        console.log('Emit users ##START##');
        console.log(event);
        console.log('Emit users ##END##');
        socket.emit('users', event);
    });
    socket.on('createRoom', data => {

    });
    socket.on('disconnect', () => {
        index = connections.indexOf(socket);
        connections.splice(index, 1);
    });
    socket.on('disconnecting', (reason) => {
        const session = cookies.session ? cookies.session : null;
        const userIndex = userSessionCheck(users, session);
        if (userIndex >= 0) {
            const {
                nickname,
                userId
            } = getUserData(users, userIndex);
            let rooms = Object.keys(socket.rooms);
            rooms = rooms.filter((room) => room !== socket.id);
            rooms.map(
                room => {
                    const roomId = room;
                    const newMessage = Message(messages, {
                        roomId,
                        message: `User ${nickname} offline`
                    });
                    const event = {
                        payload: {
                            roomId,
                            message: newMessage,
                            nickname,
                            userId
                        }
                    }
                    console.log('Emit userOffline ##START##');
                    console.log(event);
                    console.log('Emit userOffline ##END##');
                    return io.to(roomId).emit('userOffline', event);
                }
            );
        }
    });
    socket.on('forceDisconnect', () => {
        console.log('forceDisconnect - ' + socket.id);
        socket.disconnect();
    });
    socket.on('message', (message) => {
        const cookies = cookie.parse(socket.request.headers.cookie);
        const session = cookies.session ? cookies.session : null;
        const roomId = parseInt(message.roomId);
        const userIndex = userSessionCheck(users, session);
        if (userIndex >= 0 && message.message) {
            const {
                nickname,
                userId
            } = getUserData(users, userIndex);
            //const room = rooms.filter(room => room.id === roomId);
            if (!messages[roomId]) {
                messages[roomId] = [];
            }
            const newMessage = Message(messages, {
                nickname,
                userId,
                roomId,
                message: message.message
            });
            const event = {
                payload: {
                    roomId,
                    message: newMessage
                }
            }
            console.log('Emit newMessage ##START##');
            console.log(event);
            console.log('Emit newMessage ##END##');
            io.sockets.emit('newMessage', event);
        }
    });
    socket.on('fetchRoomMessages', (roomId) => {
        //if client in the room send him messages
        io.in(roomId).clients((err, clients) => {
            if (clients.includes(socket.id)) {
                const event = {
                    payload: {
                        roomId,
                        messages: messages[roomId].slice(-50)
                    }
                };
                console.log('Emit roomFetchedMessages ##START##');
                console.log(event);
                console.log('Emit roomFetchedMessages ##END##');
                socket.emit('roomFetchedMessages', event);
            }
        });

    });
    socket.on('join', (roomId) => {
        const session = cookies.session ? cookies.session : null;
        const userIndex = userSessionCheck(users, session);
        if (userIndex >= 0) {
            const {
                nickname,
                userId
            } = getUserData(users, userIndex);
            socket.join(roomId, () => {
                let event = {
                    payload: {
                        roomId,
                        message: `user join ${roomId}`
                    }
                };
                rooms[roomId].currentUsers[userId] = { 'nickname': nickname, 'online': true };
                console.log('Emit joinedRoom ##START##');
                console.log(event);
                console.log('Emit joinedRoom ##END##');
                socket.emit('joinedRoom', event);
                const newMessage = Message(messages, {
                    roomId,
                    message: `User ${nickname} is here now`
                });
                event = {
                    payload: {
                        roomId,
                        message: newMessage,
                        nickname,
                        userId
                    }
                }
                console.log('Emit userJoinRoom ##START##');
                console.log(event);
                console.log('Emit userJoinRoom ##END##');
                io.to(roomId).emit('userJoinRoom', event);
            });
        }
    });
    socket.on('leave', (roomId) => {
        const session = cookies.session ? cookies.session : null;
        const userIndex = userSessionCheck(users, session);
        if (userIndex >= 0) {
            const {
                nickname,
                userId
            } = getUserData(users, userIndex);
            socket.leave(roomId, () => {
                let event = {
                    payload: {
                        roomId,
                        message: `user left ${roomId}`
                    }
                };
                delete rooms[roomId].currentUsers[userId];
                console.log('Emit leftRoom ##START##');
                console.log(event);
                console.log('Emit leftRoom ##END##');
                socket.emit('leftRoom', event);
                const newMessage = Message(messages, {
                    roomId,
                    message: `User ${nickname} left room`
                });
                event = {
                    payload: {
                        roomId,
                        message: newMessage,
                        nickname,
                        userId
                    }
                }
                console.log('Emit userLeftRoom ##START##');
                console.log(event);
                console.log('Emit userLeftRoom ##END##');
                io.to(roomId).emit('userLeftRoom', event);
            });
        }
    });
});
app.post('/api/login', (req, res) => {
    let login = req.body.login.toLowerCase();
    let password = req.body.password;
    let save = false;
    const userIndex = users.findIndex(user => (user.login === login && user.password === md5(password)));
    if (userIndex >= 0) {
        const nickname = users[userIndex].nickname;
        const session = md5(`${Math.round(Math.random() * 100000)}${nickname}`);
        users[userIndex].session = session;
        const userId = users[userIndex].userId;
        const rooms = users[userIndex].rooms;
        save = true;
        const answer = makeAnswer({
            nickname,
            userId,
            rooms,
            session
        });
        res.cookie('session', session, {
            maxAge: 86400000,
            httpOnly: true
        });
        res.json(answer);
    } else {
        const answer = makeAnswer({}, "User not Found or password doesn't match");
        console.log("User not Found or password doesn't match");
        console.log(answer);
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
    if (req.cookies.session !== undefined) {
        const session = req.cookies.session ? req.cookies.session : null;
        const newName = req.body.nickname;
        const userIndex = userSessionCheck(users, session);
        if (userIndex >= 0) {
            if (newName) {
                users[userIndex].nickname = newName;
            }
            const {
                nickname,
                userId
            } = getUserData(users, userIndex);
            const answer = makeAnswer({
                nickname,
                userId
            });
            res.json(answer);
            fs.writeFile("./api/users.json", JSON.stringify(users), function (err) {
                if (err) {
                    return console.log(err);
                }
            });
            return true;
        }
    }
    const answer = makeAnswer({}, "Session doesn't exist user");
    res.json(answer);
});
app.post('/api/logout', (req, res) => {
    res.cookie('session', '', {
        maxAge: 0,
        httpOnly: true
    });
    if (req.cookies.session !== undefined) {
        const session = req.cookies.session ? req.cookies.session : null;
        const userIndex = userSessionCheck(users, session);
        if (userIndex > 0) {
            users[userIndex].session = NaN;
        }
    }
    const answer = makeAnswer({});
    res.json(answer);
});
app.post('/api/registration', (req, res) => {
    const login = req.body.login.toLowerCase();
    const password = md5(req.body.password);
    let save = false;
    const userIndex = users.findIndex(user => (user.login === login));
    if (userIndex >= 0) {
        const answer = makeAnswer({}, "This Login Already Taken");
        res.json(answer);
    } else if (!login) {
        const answer = makeAnswer({}, `Login can't be blank`);
        res.json(answer);
    } else {
        const nickname = `User${Math.round(Math.random() * 100000)}`;
        const session = md5(`${Math.round(Math.random() * 100000)}${nickname}`);
        const userId = nextUserId++;
        const user = {
            nickname,
            session,
            userId,
            login,
            password
        };
        res.cookie('session', session, {
            maxAge: 86400000,
            httpOnly: true
        });
        save = true;
        users.push(user);
        const answer = makeAnswer({
            nickname,
            userId
        });
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