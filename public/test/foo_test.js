/* global foo, isValidTime, formatTime */

const chai = require('chai');
chai.should();

describe('Foo', () => {
	describe('valid', () => {
		it('should return true', () => {
			foo('baz').should.be.true;
		});
	});
	describe('invalid', () => {
		it('should return false', () => {
			foo('baa').should.be.false;
		});
	});
});

describe('isValidTime', () => {
	describe('valid time', () => {
		it('should return true', () => {
			isValidTime('5:23am').should.be.true;
		});
	});
	describe('invalid time', () => {
		it('should return false', () => {
			isValidTime('25:23pm').should.be.false;
		});
	});
});

describe('formatTime', () => {
	describe('valid format: HH', () => {
		it('should return 03', () => {
			formatTime('1', '03:23:50').should.equal('03');
		});
	});
	describe('invalid format: HH', () => {
		it('should return undefined', () => {
			formatTime('1', '25:23pm').should.equal('undefined');
		});
	});
	describe('valid format: HH am/pm', () => {
		it('should return 5 am', () => {
			formatTime('2', '5:23am').should.equal('5 am');
		});
	});
	describe('invalid format: HH am/pm', () => {
		it('should return undefined', () => {
			formatTime('2', '25:23pm').should.equal('undefined');
		});
	});
	describe('valid format: HH:MM', () => {
		it('should return 5:23', () => {
			formatTime('3', '5:23am').should.equal('5:23');
		});
	});
	describe('invalid format: HH:MM', () => {
		it('should return undefined', () => {
			formatTime('3', '25:23pm').should.equal('undefined');
		});
	});
	describe('valid format: HH:MM am/pm', () => {
		it('should return 5:23 am', () => {
			formatTime('4', '5:23am').should.equal('5:23 am');
		});
	});
	describe('invalid format: HH:MM am/pm', () => {
		it('should return undefined', () => {
			formatTime('4', '25:23pm').should.equal('undefined');
		});
	});
	describe('valid format: HH:MM:SS', () => {
		it('should return 5:23:00', () => {
			formatTime('5', '5:23am').should.equal('5:23:00');
		});
	});
	describe('invalid format: HH:MM:SS', () => {
		it('should return undefined', () => {
			formatTime('5', '25:23pm').should.equal('undefined');
		});
	});
	describe('valid format: HH:MM:SS am/pm', () => {
		it('should return 5:23:00 am', () => {
			formatTime('6', '5:23am').should.equal('5:23:00 am');
		});
	});
	describe('invalid format: HH:MM:SS am/pm', () => {
		it('should return undefined', () => {
			formatTime('6', '25:23pm').should.equal('undefined');
		});
	});
});
