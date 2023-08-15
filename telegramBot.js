const TelegramApi = require('node-telegram-bot-api')

let bot;

function initTelegramBot() {
    bot = new TelegramApi('1544557968:AAFLRf3VpqCpXRU8Wi_W4GPsRNhY7Rcsla8', {polling : true})

    bot.on('message', handleMessageText)
}

async function handleMessageText(msg) {
    const msgText = msg.text
    const chatId = msg.chat.id

    console.log(msg)

    if (msgText === '/start') {
        await bot.sendMessage(chatId, 'Здоровей будешь!', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Chess', web_app: {url: `https://telegram-chess.vercel.app`}}]
                ]
            }
        })
    }
    else {
        await bot.sendMessage(chatId, msgText)
    }
}

module.exports = initTelegramBot