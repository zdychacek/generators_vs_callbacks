var suspend = require('suspend'),
	fs = require('fs');

// version with ES6 generators
suspend(function* (resume) {
	try {
		var fileContent1 = yield fs.readFile(__dirname + '/file1.txt', 'utf-8', resume);
		var fileContent2 = yield fs.readFile(__dirname + '/' + fileContent1.trim(), 'utf-8', resume);
		var fileContent3 = yield fs.readFile(__dirname + '/' + fileContent2.trim(), 'utf-8', resume);
		
		console.log('Last file content:', fileContent3);
	}
	catch (e) {
		console.log(e.toString());
	}
})();

// "callback hell" version :)
fs.readFile(__dirname + '/file1.txt', 'utf-8', function (e, fileContent1) {
	if (!e) {
		fs.readFile(__dirname + '/' + fileContent1.trim(), 'utf-8', function (e, fileContent2) {
			if (!e) {
				fs.readFile(__dirname + '/' + fileContent2.trim(), 'utf-8', function (e, fileContent3) {
					if (!e) {
						console.log('Last file content:', fileContent3);
					}
					else {
						console.log(e.toString());
					}
				});
			}
			else {
				console.log(e.toString());
			}
		});
	}
	else {
		console.log(e.toString());
	}
});