const cors = require('cors')
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors : {origin : process.env.FRONTEND_URL}})
const initClient = require('./gameLogic')
require('./telegramBot')()

const PORT = process.env.PORT && 5000

app.use(cors({
    origin: process.env.FRONTEND_URL
}))

app.get('/', (req, res) => {
    res.json('Server work')
})

server.listen(PORT, () => {
    console.log('Server started on PORT: ' + PORT)
})


io.on('connection', socket => {
    console.log('player')
    initClient(socket, io)
})



