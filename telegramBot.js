const TelegramApi = require('node-telegram-bot-api')

let bot;

async function initTelegramBot() {
    bot = new TelegramApi('1544557968:AAETBL7C0TGZ3Wewu8gVMh3kn_dmmBO9iDA')

    if (bot.isPolling()) {
        await bot.stopPolling()
    }

    await bot.startPolling()

    bot.on('message', handleMessageText)
    bot.on('callback_query', handleCallback)
}
async function handleCallback(callback) {
    console.log(callback)
    const chatId = callback.message.chat.id

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
                    [{text: 'Подключиться к комнате', callback_data : 'connectToRoom'}]
                ]
            }
        })
    }
    else {
        await bot.sendMessage(chatId, 'Подключиться к комнате пользователя:', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Подключиться к комнате', web_app: {url: `https://telegram-chess.vercel.app/game/${msgText}`}}]
                ]
            }
        })
    }
}

module.exports = initTelegramBot