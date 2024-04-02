const { Telegraf } = require('telegraf');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const bot = new Telegraf("7156035988:AAE43NDXwQucFyLnHfUXLNWIHdekbFRCNAM");


let filmes = []; 
let curFilm = []; 

async function parseFilms(filmid, chatId) {

    try {
        const url = `https://moviesdatabase.p.rapidapi.com/titles/${filmid}`; 
        const options = { method: 'GET', 
        headers: { 'X-RapidAPI-Key': 'de6e9e4ddbmshe5c68a71e594397p1b3004jsn0757cb37bb7e', 
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com' } };

        const response = await fetch(url, options); 
        const data = await response.json();
        filmes = data.items; 
        curFilm = filmes.slice(0, 1); 
        const message = getFilmMessage(curFilm);

        bot.telegram.sendMessage(chatId, message, {
            
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Еще фильмы', callback_data: 'more_films' }],
                    [{ text: 'Другой фильм', callback_data: 'other_fims' }]
                ]
            }
        });
    } catch (error) {
        bot.telegram.sendMessage(chatId, 'Ошибка при выполнении запроса');
    }
}

function getFilmMessage(films) {
    let message = '';
    films.forEach((film, index) => {
        message +=` Фильм ${index + 1}:\n${film.title}\nЖанр: ${film.genre}\n\n`;
    });
    return message;
}



bot.action('other_film', ctx => {
    filmes = [];
    curFilm = [];
    ctx.reply('Введите название, чтобы найти фильм:');
});

bot.command('start', ctx => {
    const chatId = ctx.chat.id;
    ctx.reply('Привет! Введите название фильма, чтобы найти его:');
});

bot.on('text', ctx => {
    const chatId = ctx.chat.id;
    const filmid = ctx.message.text;

    parseFilms(filmid, chatId);
});
bot.action('more_films', ctx => {
    curFilm = filmes.slice(curFilm.length, curFilm.length + 1);
    const message = getFilmMessage(curFilm);

    if (ctx.update.message && message !== ctx.update.message.text) {
        ctx.editMessageText(message, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Еще фильмы', callback_data: 'more_filmes' }],
                    [{ text: 'Другой фильм', callback_data: 'other_film' }]
                ]
            }
        });
    }
});

bot.launch();
