var request = require('request'),
	cheerio = require('cheerio');

var url = "http://www.amazon.com/Kill-Mockingbird-Harper-Lee/dp/0446310786/ref=sr_1_1?s=books&ie=UTF8&qid=1454520970&sr=1-1";

request(url, function(err, res, body){
	if (!err && res.statusCode == 200) {

		// console.log(body)

		var $ = cheerio.load(body);
		
		var obj = {},
			arrAuthor = [];

		$('.a-popover-preload').remove();

		$('span.author a.a-link-normal', '#byline').each(function(){
			var author = $(this).text();
			arrAuthor.push(author);
		});

		var date = $('h1#title').find('.a-size-medium').slice(1).eq(0).text().substring(2);

		if (date == "") {
			var details = $('#productDetailsTable').text();
			var str     = "Publication Date:";
			var index   = details.indexOf(str);
			date = details.substr(index + str.length + 1, 20).trim();
		}

		var description = $('#bookDescription_feature_div').find('noscript').text().replace(/^\s+|\s+$/g, '').replace(/\r?\n|\r/g, ' ');

		obj["author"]      = arrAuthor;
		obj["date"]        = date;
		obj["description"] = description;

		console.log(obj)

	} else {
		console.log("An error ocurred: " + error)
	}
});