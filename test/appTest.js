const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
var app = require('../app.js')

describe('AppTest', () => {
	let server;
	
	beforeEach(() => {
		delete require.cache[require.resolve('../app')];
		server = require('../app');
	});

	afterEach(done => server.close(done));

	describe('GET invalid page', () => {
		it('should return a 404 error', (done) => {
			chai.request(server)
				.get('/invalidroute')
				.end((err,res) => {
					if (!err || !res) return done(err);
					err.should.have.status(404);
					res.should.have.status(404);
					done();
				});
		});
	});



});


