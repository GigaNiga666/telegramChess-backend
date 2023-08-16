const cors = require('cors')
const express = require("express");
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors : {origin : process.env.FRONTEND_URL}})
const initClient = require('./gameLogic')
require('./telegramBot').initTelegramBot()
const answerWebAppQueryHandler = require('./telegramBot').answerWebAppQueryHandler

const PORT = process.env.PORT && 5000

app.use(cors({
    origin: process.env.FRONTEND_URL
}))
app.use(express.json())

app.get('/', (req, res) => {
    res.json('Server work')
})

app.post('/web-data', async (req, res) => {
    const {winnerName, queryId} = req.body

    try {
        await answerWebAppQueryHandler(queryId, winnerName)
        return res.status(200).json({})
    } catch (e) {
        return res.status(500).json({})
    }
})

server.listen(PORT, () => {
    console.log('Server started on PORT: ' + PORT)
})


io.on('connection', socket => {
    initClient(socket, io)
})



