https://rapidapi.com/blog/movie-api/
const url = 'https://moviesdatabase.p.rapidapi.com/titles/10';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'de6e9e4ddbmshe5c68a71e594397p1b3004jsn0757cb37bb7e',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
