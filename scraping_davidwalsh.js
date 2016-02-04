var request = require('request'),
	cheerio = require('cheerio');

var url = "https://davidwalsh.name/sides-brain";

request(url, function(err, res, body){
	if (!err && res.statusCode == 200) {

		// console.log(body)

		var $ = cheerio.load(body);
		
		var obj = {},
			arrAuthor = [];

		var author = $('a[rel=author]','#meta').text();

		if (author != "") {
			arrAuthor.push(author)
		}

		var date = $('time','#meta').text();

		var description = $('p', '#main').slice(0).eq(0).text().replace(/^\s+|\s+$/g, '').replace(/\r?\n|\r/g, ' ');

		obj["author"]      = arrAuthor;
		obj["date"]        = date;
		obj["description"] = description;

		console.log(obj)

	} else {
		console.log("An error ocurred: " + error)
	}
});