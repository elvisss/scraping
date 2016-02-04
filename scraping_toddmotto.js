var request = require('request'),
	cheerio = require('cheerio');

var url = "https://toddmotto.com/creating-an-html5-responsive-ready-contact-form-with-custom-javascript-feature-detection";

request(url, function(err, res, body){
	if (!err && res.statusCode == 200) {

		// console.log(body)

		var $ = cheerio.load(body);
		
		var obj = {},
			arrAuthor = [];

		var author = $('h3', '.author__bio').text().trim();

		if (author != "") {
			arrAuthor.push(author)
		}

		var date = $('time', '.post__meta').text().trim().substring(10);

		var description = $('p', '.post__content').slice(0).eq(0).text().replace(/^\s+|\s+$/g, '').replace(/\r?\n|\r/g, ' ');

		obj["author"]      = arrAuthor;
		obj["date"]        = date;
		obj["description"] = description;

		console.log(obj)

	} else {
		console.log("An error ocurred: " + error)
	}
});