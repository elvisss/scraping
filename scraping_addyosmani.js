var request = require('request'),
	cheerio = require('cheerio');

var url = "https://addyosmani.com/blog/using-npm-offline/";

request(url, function(err, res, body){
	if (!err && res.statusCode == 200) {

		// console.log(body)

		var $ = cheerio.load(body);
		
		var obj = {},
			arrAuthor = [],
			date = "",
			description = "";

		var author = $('span.dark', '#post-meta').text().trim();

		if (author != "") {
			arrAuthor.push(author)
		}

		date = $('h2.headline', '.post').text().trim();

		description = $('p', '#post-body').slice(0).eq(0).text().replace(/^\s+|\s+$/g, '').replace(/\r?\n|\r/g, ' ');

		obj["author"]      = arrAuthor;
		obj["date"]        = date;
		obj["description"] = description;

		console.log(obj)

	} else {
		console.log("An error ocurred: " + error)
	}
});