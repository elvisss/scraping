var request = require('request'),
	cheerio = require('cheerio');

var url = "https://markgoodyear.com/2015/03/retinafy-your-craft-site-with-retinafy-plugin/";

request(url, function(err, res, body){
	if (!err && res.statusCode == 200) {

		// console.log(body)

		var $ = cheerio.load(body);
		
		var obj = {},
			arrAuthor = [];

		arrAuthor.push("Mark Goodyear");

		var date = $('.post__meta').text();
		
		var description = $('p', '.post-content').slice(0).eq(0).text().replace(/^\s+|\s+$/g, '').replace(/\r?\n|\r/g, ' ');

		obj["author"]      = arrAuthor;
		obj["date"]        = date;
		obj["description"] = description;

		console.log(obj)

	} else {
		console.log("An error ocurred: " + error)
	}
});