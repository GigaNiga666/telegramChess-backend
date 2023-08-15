const TelegramApi = require('node-telegram-bot-api')

let bot;

async function initTelegramBot() {
    bot = new TelegramApi(process.env.TOKEN)

    if(bot.isPolling()) {
        await bot.stopPolling();
    }

    await bot.startPolling();

    bot.on('message', handleMessageText)

    await bot.stopPolling();
}

async function handleMessageText(msg) {
    const msgText = msg.text
    const chatId = msg.chat.id

    if (msgText === '/start') {
        await bot.sendMessage(chatId, msg.from.username)
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