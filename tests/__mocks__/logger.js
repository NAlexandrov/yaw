const logger = {
  child: jest.fn().mockReturnThis(),
  trace: jest.fn(),
  error: jest.fn(),
};

module.exports = logger;
