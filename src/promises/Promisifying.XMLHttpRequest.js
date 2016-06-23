
function get(url) {
	return new Promise(function(resolve, reject) { // return a new promise.
		var req = new XMLHttpRequest(); // Do the usual XHR stuff
		req.open('GET', url);
		req.onload = function() {
			if (req.status == 200) { // this is called even on 404 etc.  so check the status
				resolve(req.response); // Resolve the promise with the response text
			} else {
				reject(Error(req.statusText)); // Otherwise reject with the status text which will hopefully be a meaningful error
			}
		};
		req.onerror = function() { // Handle network errors
			reject(Error('Network Error'));
		};
		req.send(); // Make the request
	});
}

// 01
// get('story.json').then(function(response) {
//	console.log('Success!', response);
//	return JSON.parse(response)
//}, function(error) {
//	console.log('Failed!', error);
//});

// 02
// get('story.json').then(JSON.parse).then(function(response) {
//	console.log("Yey JSON!", response);
//});

// 03
function getJSON(url) {
	return get(url).then(JSON.parse).catch(function(error) {
		console.log('getJSON failed for', url, error);
		throw error;
	});
}

//getJSON('story.json').then(function(story) {
//	return getJSON(story.chapterUrls[0]);
//}).then(function(chapter1) {
//	console.log('Got chapter 1!', chapter1)
//});

var storyPromise;

function getChapter(i) {
	storyPromise = storyPromise || getJSON('story.json');

	return storyPromise.then(function(story) {
		return getJSON(story.chapterUrls[i]);
	});
}

getJSON('story.json').then(function(story) {
	addHtmlToPage(story.heading);

	// Take an array of promises and wait on them all
	return Promise.all(
		// Map our array of chapter urls to
		// an array of chapter json promises
		story.chapterUrls.map(getJSON)
	);
}).then(function(chapters) {
	// Now we have the chapters jsons in order! Loop through…
	chapters.forEach(function(chapter) {
		// …and add to the page
		addHtmlToPage(chapter.html);
	});
	addTextToPage("All done");
}).catch(function(err) {
	// catch any error that happened so far
	addTextToPage("Argh, broken: " + err.message);
}).then(function() {
	document.querySelector('.spinner').style.display = 'none';
});
// http://www.html5rocks.com/en/tutorials/es6/promises/










