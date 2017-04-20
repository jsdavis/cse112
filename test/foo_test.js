var should = chai.should;

describe("Foo", () => {
	describe("valid", () => {
		it("should expect to return true", () => {
			var fooTest = foo("baz");
			should(fooTest).to.be.true;
		});
	});
	describe("valid", () => {
		it("should expect to return false", () => {
			var fooTest = foo("baa");
			should(fooTest).to.not.be.true;
		});
	});
});
