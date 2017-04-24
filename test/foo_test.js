var should = require('chai').should();

describe("Foo", () => {
	describe("valid", () => {
		it("should expect to return true", () => {
			foo("baz").should.be.true;
		});
	});
	describe("valid", () => {
		it("should expect to return false", () => {
			foo("baa").should.be.false;
		});
	});
});
