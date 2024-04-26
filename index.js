const { Telegraf } = require('telegraf');

const bot = new Telegraf("6478194199:AAGJnLgrc_aNFeps9QpVZds7nIyCQkxOI7U");


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
async function weapons(weaponName) {
    const url =`https://eldenring.fanapis.com/api/weapons?name=${weaponName}`;
    console.log(url)
    const response = await fetch(url);
    const abc = await response.json();
    const itemData = abc.data
    const result = JSON.stringify(itemData)
    let msg = ""
    msg += result.split('attack:').join(' ').split('defence:').join(' ').split(",").join("\n") 
    return msg
}
async function parseItems(chatId, itemName) {

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

async function parseWeapons(chatId, weaponName) {

    try {
        const message = await weapons(weaponName);
        console.log(message)

        bot.telegram.sendMessage(chatId, message, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Еще оружия', callback_data: 'more_weapons' }],
                    [{ text: 'Другое оружие', callback_data: 'other_weapon' }]
                ]
            }
        });
    } catch (error) {
        bot.telegram.sendMessage(chatId, 'Ошибка при выполнении запроса');
    }
}
bot.action('other_weapon', ctx => {
    ctx.reply('Введите другой предмет, чтобы найти его:');
});


bot.action('other_item', ctx => {
    ctx.reply('Введите другой предмет, чтобы найти его:');
});

bot.command('start', ctx => {
    const chatId = ctx.chat.id;
    ctx.reply('Привет! Выберите что-то из игры /weapon или /item:');
});

bot.on('text', ctx => {
    ctx.reply('Выберите оружие из игры:');
    const chatId = ctx.chat.id;
    const itemName = ctx.message.text
    items(itemName)
    parseItems(chatId, itemName);
});
bot.on('text', ctx => {
    ctx.reply('Выберите оружие из игры:');
    const chatId = ctx.chat.id;
    const weaponName = ctx.message.text
    weapons(weaponName)
    parseWeapons(chatId, weaponName);
});
bot.action('more_items', async ctx => {
    const chatId = ctx.chat.id;
    const message = await itemsList();
    
    bot.telegram.sendMessage(chatId, message, {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Еще предметы', callback_data: 'more_items' }],
                [{ text: 'Другой предмет', callback_data: 'other_item' }]
            ]
        }
    })
});

bot.launch();
