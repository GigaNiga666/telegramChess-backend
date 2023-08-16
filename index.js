const cors = require('cors')
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors : {origin : process.env.FRONTEND_URL}})
const initClient = require('./gameLogic')
const bot = require('./telegramBot')()

const PORT = process.env.PORT && 5000

app.use(cors({
    origin: process.env.FRONTEND_URL
}))

app.get('/', (req, res) => {
    res.json('Server work')
})

app.post('/', (req, res) => {
    const {winnerName, queryId} = req.body
    console.log(winnerName, queryId)

    try {
        bot.answerWebAppQuery(queryId, {
            type:'article',
            id: queryId,
            title: 'Результаты игры',
            input_message_content: {
                message_text: `Выиграл игрок: ${winnerName}`
            }
        })
        return res.status(200).json({})
    } catch (e) {
        bot.answerWebAppQuery(queryId, {
            type:'article',
            id: queryId,
            title: 'Что-то пошло не так',
            input_message_content: {
                message_text: `Что-то пошло не так`
            }
        })
        return res.status(500).json({})
    }
})

server.listen(PORT, () => {
    console.log('Server started on PORT: ' + PORT)
})


io.on('connection', socket => {
    initClient(socket, io)
})



