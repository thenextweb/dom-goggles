const expect = require("chai").expect;
const domGoggles = require('../main');

describe("Dom goggles", function() {


	this.timeout(5000);


	it("looks for a body tag on google.com", function(done) {

		domGoggles(
			'http://google.com',
			'<body'
		).then(results => {
			try {
				expect(results.total['<body']).to.be.at.least(1)
				done();
			} catch(e) {
				done(e);
			}
		}).catch(e => {
			done(e)
		})

	});


	it("looks for a body, <div> tag on google.com & facebook", function(done) {

		domGoggles(
			['http://google.com','http://facebook.com'],
			['<body','<div']
		).then(results => {
			try {
				expect(results.total['<body']).to.be.at.least(2)
				done();
			} catch(e) {
				done(e);
			}
		}).catch(e => {
			done(e)
		})

	});


	it("looks for a body, <div> tag on google.com & facebook using a regex", function(done) {

		domGoggles(
			['http://google.com','http://facebook.com'],
			[/<body/,/<div/]
		).then(results => {
			try {
				expect(results.total[/<body/]).to.be.at.least(2)
				done();
			} catch(e) {
				done(e);
			}
		}).catch(e => {
			done(e)
		})

	});


	it("looks for more than 3 divs on facebook.com", function(done) {

		domGoggles(
			['http://facebook.com'],
			['<div']
		).then(results => {
			try {
				expect(results.total['<div']).to.be.above(4)
				done();
			} catch(e) {
				done(e);
			}
		}).catch(e => {
			done(e)
		})

	});


	it("looks for a non existent (HOPEFULLY) <wrigglityboo> tag on google.com & facebook", function(done) {

		domGoggles(
			['http://google.com','http://facebook.com'],
			['<wrigglityboo']
		).then(results => {
			try {
				expect(results.total['<wrigglityboo']).to.equal(0)
				done();
			} catch(e) {
				done(e);
			}
		}).catch(e => {
			done(e)
		})

	});


});
