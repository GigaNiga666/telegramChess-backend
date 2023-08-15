const TelegramApi = require('node-telegram-bot-api')

let bot;

function initTelegramBot() {
    bot = new TelegramApi(process.env.TOKEN, {polling:true})

    bot.on('message', handleMessageText)
    bot.on('callback', handleCallback)
}
async function handleCallback(callback) {
    const chatId = callback.user.chat.id

    if (callback.data === 'connectToRoom') {
        await bot.sendMessage(chatId, 'Напиши username пользователя к которому хочешь подключиться')
    }
}

async function handleMessageText(msg) {
    const msgText = msg.text
    const chatId = msg.chat.id

    if (msgText === '/start') {
        await bot.sendMessage(chatId, 'Выбери 1 из действий:', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Создать комнату', web_app: {url: `https://telegram-chess.vercel.app/game/${msg.from.username}`}}],
                    [{text: 'Подключиться к комнате', value : 'connectToRoom'}]
                ]
            }
        })
    }
    else {
        await bot.sendMessage(chatId, 'Подключиться к комнате пользователя:', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Подключиться к комнате', value : 'connectToRoom', web_app: {url: `https://telegram-chess.vercel.app/game/${msgText}`}}]
                ]
            }
        })
    }
}

module.exports = initTelegramBot