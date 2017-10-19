module.exports = {
  verbose: true,
  collectCoverage: true,
  roots: [
    '<rootDir>/tests/',
  ],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupFiles: ['./tests/jestsetup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
