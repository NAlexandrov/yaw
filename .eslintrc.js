module.exports = {
  root: true,
  extends: 'airbnb',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    "strict": 0,
    "no-tabs": 0,
    "arrow-parens": [2, "always"],
    "no-underscore-dangle": [2, { "allowAfterThis": true }],
    "max-len": [2, 120, 4, { "ignoreUrls": true }],
    "no-confusing-arrow": [2, { "allowParens": true }],
    "no-restricted-globals": 0,

    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": 0,

    "jsx-quotes": [2, "prefer-single"],

    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-closing-bracket-location": [1, "after-props"],
    "react/require-default-props": 0,
    "react/no-array-index-key": 0,

    "function-paren-newline": 0,
  },
  globals: {
    expect: true,
    test: true,
    it: true,
    describe: true,
    beforeAll: true,
    afterAll: true,
    jest: true,
  },
};
