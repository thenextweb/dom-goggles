const expect = require('chai').expect;
const domGoggles = require('../main');

describe('Dom goggles', function() {


	this.timeout(5000);


	it('looks for a body tag on google.com & logs all of it', function(done) {

		domGoggles(
			'http://google.com',
			'<body',
			{
				logger: true
			}
		).then(results => {
			try {
				expect(results.total['<body']).to.be.at.least(1);
				done();
			} catch(e) {
				done(e);
			}
		}).catch(e => {
			done(e);
		});

	});


});
