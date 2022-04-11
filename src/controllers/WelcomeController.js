const axios = require('axios');
const cheerio = require('cheerio');
const pretty = require('pretty');
const fs = require('fs');

const welcomeHome = (req, res) => {
	res.render('./pages/index', { page: 'Welcome to our Space' });
};

const postBlog = async (req, res) => {
	const url = 'https://growng.company/blog/';
	try {
		// Fetch HTML of the page we want to scrape
		const { data } = await axios.get(url);
		// Load HTML we fetched in the previous line
		const $ = cheerio.load(data);

		// Select all the list items in plainlist class
		const listItems = $('main article');

		// Stores data for all countries
		const blogPost = [];
		// Use .each method to loop through the li we selected
		listItems.each((idx, el) => {
			// Object holding data for each country/jurisdiction
			const post = { content: '', image: '', title: '' };
			// Select the text content of a and span elements
			// Store the textcontent in the above object
			post.content = $(el).children('div').text();
			post.image = $(el).children('figure').html();
			post.title = $(el).children('header').html();

			if (post.content != null && post.image != null) {
				blogPost.push(post);
			}
		});
		// Logs countries array to the console
		// console.dir(blogPost);
		// Write post array in blogpost.json file
		fs.writeFile('./blogpost.json', JSON.stringify(blogPost, null, 2), (err) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log('Successfully written data to file');
			res.send(blogPost);
		});
	} catch (err) {
		console.error(err);

		res.status(400).send(err);
	}
};

module.exports = { welcomeHome, postBlog };
