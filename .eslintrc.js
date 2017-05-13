module.exports = {
    "extends": ["google"],
    "env": {
      "browser": true,
      "es6": true,
      "jquery": true,
      "mocha": true,
      "node": true
    },
    "rules": {
      "no-unused-vars": [1, {"vars": "all", "varsIgnorePattern": "Ignored"}],
      "indent": ["error", 2],
      "no-mixed-spaces-and-tabs": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "error"
    }
};
