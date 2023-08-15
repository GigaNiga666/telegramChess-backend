const colorRandom = require('./helpers/colorRandom')

let io;

const sessions = {}


function initClient(socket, webSocket) {
    io = webSocket

    socket.on('initGame', initGame)
    socket.on('newMove', newMove)
    socket.on('disconnect', disconnect)
}

function initGame(sessionId) {
    const room = io.sockets.adapter.rooms.get(sessionId)

    if (room === undefined) {
        this.join(sessionId)
        sessions[this.id] = sessionId
    }
    else if (room.size < 2) {
        this.join(sessionId)
        sessions[this.id] = sessionId
        this.broadcast.to(sessionId).emit('newPlayerJoin', 'Новый игрок присоединился')

        const playerOneColor = colorRandom()
        const playerTwoColor = playerOneColor === 'white' ? 'black' : 'white'

        room.forEach(client => {
            if (client === this.id)
                this.emit('startGame', playerTwoColor)
            else
                this.to(client).emit('startGame', playerOneColor)
        })
    }
    else {
        this.emit('error', 'There are 2 people already playing in this room')
    }
}

function newMove(coordinates) {
    io.to(sessions[this.id]).emit('newMove', coordinates)
}

function disconnect() {
    if (sessions.hasOwnProperty(this.id)) {
        io.to(sessions[this.id]).emit('playerLeave', 'Игрок ушёл')
        delete sessions[this.id]
    }
}

module.exports = initClient