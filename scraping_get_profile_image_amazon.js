var request = require('request'),
	cheerio = require('cheerio');

var getHigher = function(obj) {

	var arrImgs  = [],
		arrSizes = [],
		url_img  = "";

	for (var key in obj) {
		arrImgs.push(key)
		arrSizes.push(obj[key][0])
	}

	if (arrSizes[0] > arrSizes[1]) {
		url_img = arrImgs[0]
	} else {
		url_img = arrImgs[1]
	}

	return url_img;

}

var url = "http://www.amazon.com/Learn-iOS-8-App-Development/dp/1484202090/";

request(url, function(err, res, body){
	if (!err && res.statusCode == 200) {
		var $ = cheerio.load(body);
		var obj = $('#img-canvas').find('img.frontImage').data('aDynamicImage');
		
		if(typeof obj === 'undefined'){
			var url = "Not found.";
		} else {
			var url = getHigher(obj);
		}

		console.log(url)
	} else {
		console.log("An error ocurred: " + error)
	}
});