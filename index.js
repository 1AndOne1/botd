const { Telegraf } = require('telegraf');

const bot = new Telegraf("6478194199:AAGJnLgrc_aNFeps9QpVZds7nIyCQkxOI7U");


let allVacancies = []; 
let currentVacancies = [];


async function items(itemName) {
    const url =`https://eldenring.fanapis.com/api/items?name=${itemName}`;
    console.log(url)
    const response = await fetch(url);
    const abc = await response.json();
    const itemData = abc.data
    const result = JSON.stringify(itemData)
    let msg = ""
    msg += result.split(",").join("\n") 
    return msg
}



async function parseVacancies(chatId, itemName) {

    try {
        const message = await items(itemName);
        console.log(message)

        bot.telegram.sendMessage(chatId, message, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Еще предметы', callback_data: 'more_items' }],
                    [{ text: 'Другой предмет', callback_data: 'other_item' }]
                ]
            }
        });
    } catch (error) {
        bot.telegram.sendMessage(chatId, 'Ошибка при выполнении запроса');
    }
}


bot.action('other_item', ctx => {
    allVacancies = [];
    currentVacancies = [];
    ctx.reply('Введите другой предмет, чтобы найти его:');
});

bot.command('start', ctx => {
    const chatId = ctx.chat.id;
    ctx.reply('Привет! Введите предмет из игры, чтобы увидеть его характеристики:');
});
bot.on('text', async ctx => {
    const chatId = ctx.chat.id;
    const itemName = ctx.message.text
    items(itemName)
    parseVacancies(chatId, itemName);
});
bot.action('more_items', async ctx => {
    const chatId = ctx.chat.id;
    
    async function itemsList() { 
        let number = 1
        const url =`https://eldenring.fanapis.com/api/items?limit=1&page=${number}`;
        const response = await fetch(url);
        const abc = await response.json();
        const itemData = abc.data
        const result = JSON.stringify(itemData)
        let msg = ""
        msg += result.split(",").join("\n")
        
        return msg
    }
    const message = await itemsList();
    
    bot.telegram.sendMessage(chatId, message, {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Еще предметы', callback_data: 'more_items' }],
                [{ text: 'Другой предмет', callback_data: 'other_item' }]
            ]
        }
    })
    itemsList.number++
});

bot.launch();
