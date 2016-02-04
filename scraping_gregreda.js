var request = require('request'),
	cheerio = require('cheerio');

var url = "http://www.gregreda.com/2015/11/19/nl-cyyoung-viz-2015/";

request(url, function(err, res, body){
	if (!err && res.statusCode == 200) {

		// console.log(body)

		var $ = cheerio.load(body);
		
		var obj = {},
			arrAuthor = [];

		var author = $('.navbar h1 a').text().trim();

		if (author != "") {
			arrAuthor.push(author)
		}

		var date_long = $('.article-date').text().trim();
		var index     = date_long.indexOf("|");
		var date      = date_long.substr(0, index - 2);

		var description = $('p', '.article-content').slice(0).eq(0).text().replace(/^\s+|\s+$/g, '').replace(/\r?\n|\r/g, ' ');

		obj["author"]      = arrAuthor;
		obj["date"]        = date;
		obj["description"] = description;

		console.log(obj)

	} else {
		console.log("An error ocurred: " + error)
	}
});