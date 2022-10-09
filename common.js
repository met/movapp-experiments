'use strict';

const dictUrl = 'https://data.movapp.eu/uk-cs-dictionary.json';
let dict = null;

async function FetchAsync(url) {
	let response = await fetch(url);
	// only proceed once promise is resolved
	let data = await response.json();
	// only proceed once second promise is resolved
	return data;
}

function LoadDictionary(callback) {
	FetchAsync(dictUrl)
	    .then(data => {
	    	dict = {};
	    	dict.data = data;
	    	//console.log(data);

			dict.phrases = [];
			dict.czech_phrases = [];
			dict.ukrainian_phrases = [];

			for (let key in data.phrases) {
				let phrase = data.phrases[key]

				if (phrase.main && phrase.source) {
					dict.phrases.push(phrase)
					dict.czech_phrases.push(phrase.main.translation);
					dict.ukrainian_phrases.push(phrase.source.translation);
				}
				else {
					console.log(`Eror in phase ${phrase} ${key}`);
				}
			}

	    	callback(dict);
	    })
	    .catch(reason => console.log(reason.message))
}


function RandomArrayItem(arr) {
	if (arr) {
		return arr[Math.floor(Math.random()*arr.length)];
	}
	else
	{
		throw 'called randomArrayItem with undefined array';
	}
}

function DictionaryAnalytics(dict) {
	let data = dict.data;
	let phrases = dict.phrases;
	let czech_phrases = dict.czech_phrases;
	let ukrainian_phrases = dict.ukrainian_phrases;

	for (let cat of data.categories) {
		console.log(`${cat.name.main}; ${cat.name.source}; ${cat.phrases.length}`);
	}

	console.log(phrases);
	console.log(czech_phrases);
	console.log(ukrainian_phrases);

	czech_phrases.sort();
	console.log(czech_phrases);
	console.log(czech_phrases[0]);
	console.log(czech_phrases[czech_phrases.length-1]);

	czech_phrases.sort((a,b) => { return a.length - b.length });
	console.log(czech_phrases);
	console.log(czech_phrases[0]);
	console.log(czech_phrases[czech_phrases.length-1]);	
}