const Zombie = require('zombie');

const test = (url,tests) => {
	const browser = new Zombie();
	let solution = {};
	return new Promise((resolve, reject)=>{
		browser.fetch(url)
			.then(function(response) {
				if (response.status === 200) {
					return response.text();
				}
				else {
					reject(response)
				}
			})
			.then(function(text) {
				tests.map(test => {
					let regex = (!test.test)?
						new RegExp(test,'g'):
						new RegExp(test.source,test.flags);

                    let matches = text.match(regex);
                    solution[test] = matches?matches.length:0
				})
				resolve(solution)
			})
			.catch(reject);
	});
}

const main = (webpages, tests, options={}) => {

	if(typeof webpages === 'string') {
		webpages = [webpages]
	}
	if(typeof tests === 'string') {
		tests = [tests]
	}

	if(!tests || !webpages) {
		throw 'Things are missing!';
	}

	return new Promise((resolve, reject)=>{

		let resultsTotal = {};
		let resultsByWebpage = {};
		let count = 0;

		const finalPass = () => {
			Object.keys(resultsByWebpage).map(url => {
				Object.keys(resultsByWebpage[url]).map(test => {
					if(!resultsTotal[test]) resultsTotal[test] = 0;
					if(resultsByWebpage[url][test] > 0) {
						resultsTotal[test] += resultsByWebpage[url][test];
					}
				})
			})
			resolve({
				total: resultsTotal,
				byWebpage: resultsByWebpage
			});
		}

		const returnMaybe = () => {
			count++;
			if(count >= webpages.length) {
				finalPass()
			}
		}

		if(options.report) console.log('> Started');

		webpages.map(url => {
			test(url,tests)
			.then(solution => {
				if(options.report) {
					let results = (()=>{
						let arr = [];
						Object.keys(solution).map(key=>{
							if(solution[key] > 0) arr.push(key)
						});
						return arr;
					})();
					console.log(`> ${url} – ${results.length}/${tests.length} `);
					console.log('> '+results.join(', '));
				}
				resultsByWebpage[url] = solution
				returnMaybe();
			})
			.catch(error => {
				reject(error);
			})
		});

	});
};


module.exports = main;
