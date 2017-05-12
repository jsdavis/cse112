/* const chai = require('chai');
const foo = require('../public/js/foo.js');
const main = require('../public/js/main.js');

chai.should();

 describe('Foo', () => {
  describe('valid', () => {
    it('should return true', () => {
      foo.foo('baz').should.be.true;
    });
  });
  describe('invalid', () => {
    it('should return false', () => {
      foo.foo('baa').should.be.false;
    });
  });
});

describe('isValidTime', () => {
  describe('valid time', () => {
    it('should return true', () => {
      main.isValidTime('5:23am').should.be.true;
    });
  });
  describe('invalid time', () => {
    it('should return false', () => {
      main.isValidTime('25:23pm').should.be.false;
    });
  });
});

describe('formatTime', () => {
  describe('valid format: HH', () => {
    it('should return 03', () => {
      main.formatTime('1', '03:23:50').should.equal('03');
    });
  });
  describe('invalid format: HH', () => {
    it('should return undefined', () => {
      main.formatTime('1', '25:23pm').should.equal('Time is Invalid');
    });
  });
  describe('valid format: HH am/pm', () => {
    it('should return 5 am', () => {
      main.formatTime('2', '5:23am').should.equal('5 am');
    });
  });
  describe('invalid format: HH am/pm', () => {
    it('should return undefined', () => {
      main.formatTime('2', '25:23pm').should.equal('Time is Invalid');
    });
  });
  describe('valid format: HH:MM', () => {
    it('should return 5:23', () => {
      main.formatTime('3', '5:23am').should.equal('5:23');
    });
  });
  describe('invalid format: HH:MM', () => {
    it('should return undefined', () => {
      main.formatTime('3', '25:23pm').should.equal('Time is Invalid');
    });
  });
  describe('valid format: HH:MM am/pm', () => {
    it('should return 5:23 am', () => {
      main.formatTime('4', '5:23am').should.equal('5:23 am');
    });
  });
  describe('invalid format: HH:MM am/pm', () => {
    it('should return undefined', () => {
      main.formatTime('4', '25:23pm').should.equal('Time is Invalid');
    });
  });
  describe('valid format: HH:MM:SS', () => {
    it('should return 5:23:00', () => {
      main.formatTime('5', '5:23am').should.equal('5:23:00');
    });
  });
  describe('invalid format: HH:MM:SS', () => {
    it('should return undefined', () => {
      main.formatTime('5', '25:23pm').should.equal('Time is Invalid');
    });
  });
  describe('valid format: HH:MM:SS am/pm', () => {
    it('should return 5:23:00 am', () => {
      main.formatTime('6', '5:23am').should.equal('5:23:00 am');
    });
  });
  describe('invalid format: HH:MM:SS am/pm', () => {
    it('should return undefined', () => {
      main.formatTime('6', '25:23pm').should.equal('Time is Invalid');
    });
  });
});*/
