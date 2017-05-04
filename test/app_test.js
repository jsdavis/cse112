const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

describe('AppTest', () => {
	let app;
	let server;

	beforeEach((done) => {
		delete require.cache[require.resolve('../app')];
		app = require('../app');
		server = app.listen(3000, done);
	});

	afterEach((done) => server.close(done));

	describe('GET invalid page', () => {
		it('should return a 404 error', (done) => {
			chai.request(server)
				.get('/invalidroute')
				.end((err, res) => {
					if (!err || !res) return done(err);
					err.should.have.status(404);
					res.should.have.status(404);
					done();
				});
		});
	});

	describe('GET /', () => {
		it('should return with status 200 and an html page', (done) => {
			chai.request(server)
				.get('/')
				.end((err, res) => {
					if (err) return done(err);
					res.should.have.status;
					res.status.should.be.above(199);
					res.status.should.be.below(300);
					done();
				});
		});
	});
});


