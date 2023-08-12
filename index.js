const cors = require('cors')
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors : {origin : 'https://bejewelled-sundae-b83073.netlify.app'}})
const initClient = require('./gameLogic')

const PORT = process.env.PORT && 5000

app.use(cors({
    origin: 'https://bejewelled-sundae-b83073.netlify.app/'
}))

app.get('/', (req, res) => {
    console.log('something')
    res.json('Server work')
})

server.listen(PORT, () => {
    console.log('Server started on PORT:' + PORT)
})


io.on('connection', socket => {
    console.log('player')
    initClient(socket, io)
})



