const TelegramApi = require('node-telegram-bot-api')

let bot;

function initTelegramBot() {
    bot = new TelegramApi(process.env.TOKEN, {polling:true})

    bot.on('message', handleMessageText)
}

async function handleMessageText(msg) {
    const msgText = msg.text
    const chatId = msg.chat.id

    if (msgText === '/start') {
        await bot.sendMessage(chatId, 'Здоровей будешь!', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Chess', web_app: {url: `https://telegram-chess.vercel.app/game/${msg.from.username}`}}]
                ]
            }
        })
    }
    else {
        await bot.sendMessage(chatId, msgText)
    }
}

module.exports = initTelegramBot