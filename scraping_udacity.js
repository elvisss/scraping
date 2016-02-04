var request = require('request'),
	cheerio = require('cheerio');

var url = "https://www.udacity.com/courses/ep245";

request(url, function(err, res, body){
	if (!err && res.statusCode == 200) {

		// console.log(body)

		var $ = cheerio.load(body);
		
		var obj = {},
			arrAuthor = [];

		$('.instructor-information h3 a', '#page-content').each(function(){
			var author = $(this).text();
			arrAuthor.push(author);
		});
		
		var description = $('p', '.pretty-format').slice(0).eq(0).text().replace(/^\s+|\s+$/g, '').replace(/\r?\n|\r/g, ' ');

		obj["author"]      = arrAuthor;
		obj["date"]        = "";
		obj["description"] = description;

		console.log(obj)

	} else {
		console.log("An error ocurred: " + error)
	}
});