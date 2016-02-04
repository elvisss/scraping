var request = require('request'),
	cheerio = require('cheerio');

var url = "http://kldavenport.com/lending-club-data-analysis-revisted-with-python/";

request(url, function(err, res, body){
	if (!err && res.statusCode == 200) {

		// console.log(body)

		var $ = cheerio.load(body);
		
		var obj = {},
			arrAuthor = [],
			description = "";

		var author = $('.author', '.date').text();

		if (author != "") {
			arrAuthor.push(author);
		}

		var date = $('.entry-date', '.date').text();

		var image = $('p', '.entry-content').slice(0).eq(0).find('img').length;

		if (image == 0) {
			description = $('p', '.entry-content').slice(0);
		} else {
			description = $('p', '.entry-content').slice(1);
		}

		description = description.eq(0).text().replace(/^\s+|\s+$/g, '').replace(/\r?\n|\r/g, ' ')

		obj["author"]      = arrAuthor;
		obj["date"]        = date;
		obj["description"] = description;

		console.log(obj)

	} else {
		console.log("An error ocurred: " + error)
	}
});