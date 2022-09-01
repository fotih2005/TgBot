const TelegramApi = require('node-telegram-bot-api')
const { messageTypes } = require('node-telegram-bot-api/src/telegram')
const { options } = require('nodemon/lib/config')
const token = "5775995170:AAH_LlU2hkViWOIkXNr6FvhHgWRdIPYOeD8"


const bot = new TelegramApi(token, {polling: true})

const chats = {}

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
            [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
            [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
        ]
    })
}
const againOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: "Qayta o'ynash", callback_data: "/again"}],
        ]
    })
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Boshlash'},
        {command: '/info', description: "Foydalanuvchi ma'lumotlari"},
        {command: '/game', description: "Raqamli o`yin!"},
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if(text === '/start'){
            await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/192/7.webp')
            return bot.sendMessage(chatId, `Xush kelibsiz!`)
        }
        if(text === '/info'){
            return bot.sendMessage(chatId, `Sizning ismingiz ${msg.from.first_name}`)
        }
        if(text === '/game'){
            await bot.sendMessage(chatId, `Men 1 dan 9 gacha son o'ylayman, siz esa men o'ylagan sonni topasiz`)
            const randomNumber = Math.floor(Math.random() * 10)
            chats[chatId] = randomNumber
            return bot.sendMessage(chatId, 'Taxmin qiling!', gameOptions)
        }
        return bot.sendMessage(chatId, 'Men sizni tushuna olmadim, Qayta urinib ko`ring!')
    })    

    bot.on('callback_query', async msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        const randomNumber = Math.floor(Math.random() * 10)
        if(data === '/again'){
            await bot.sendMessage(chatId, `Men 1 dan 9 gacha son o'ylayman, siz esa men o'ylagan sonni topasiz`)
            const randomNumber = Math.floor(Math.random() * 10)
            chats[chatId] = randomNumber
            return bot.sendMessage(chatId, 'Taxmin qiling!', gameOptions)
        }
        if(data === JSON.stringify(randomNumber)){
            return await bot.sendMessage(chatId, `Tabriklayman siz to'g'ri javop berdingiz ${data}`, againOptions)
        } else {
            return bot.sendMessage(chatId, `Men ${chats[chatId]} raqamini o'ylagan edim :(`, againOptions)
        }

    })
}
start()