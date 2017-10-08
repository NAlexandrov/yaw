// .eslintrc is deprecated. http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  extends: 'airbnb',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    strict: 0,
    "no-underscore-dangle": [2, { "allowAfterThis": true }],
  },
  globals: {
    expect: true,
    test: true,
    it: true,
  },
};
