const should = chai.should();

describe('Foo', () => {
	describe('valid', () => {
		it('should return true', () => {
			foo('baz').should.be.true;
		});
	});
	describe('valid', () => {
		it('should return false', () => {
			foo('baa').should.be.false;
		});
	});
});
