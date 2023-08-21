const TelegramApi = require('node-telegram-bot-api')

let bot;

async function initTelegramBot() {
    bot = new TelegramApi('1544557968:AAETBL7C0TGZ3Wewu8gVMh3kn_dmmBO9iDA')

    await bot.stopPolling()

    await bot.startPolling()

    bot.on('message', handleMessageText)
    bot.on('callback_query', handleCallback)
}
async function answerWebAppQueryHandler(queryId, isWin) {
    console.log('sog', isWin)
    await bot.answerWebAppQuery(queryId, {
        type:'article',
        id: queryId,
        title: 'Результаты игры',
        input_message_content: {
            message_text: isWin ? 'Вы выиграли!' : 'Вы проиграли'
        }
    })
}
async function handleCallback(callback) {
    const chatId = callback.message.chat.id

    if (callback.data === 'connectToRoom') {
        await bot.sendMessage(chatId, 'Напиши username пользователя к которому хочешь подключиться (включая @)')
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
        return
    }
    else if (msgText.startsWith('@')) {
        await bot.sendMessage(chatId, `Подключиться к комнате пользователя: ${msgText.match(/\w/g)}`, {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Подключиться к комнате', web_app: {url: `https://telegram-chess.vercel.app/game/${msgText.match(/\w/g)}`}}]
                ]
            }
        })
        return
    }
}

module.exports = {initTelegramBot, answerWebAppQueryHandler}