'use strict';

const axios = require('axios');

class MobileOperatorDetector {
  constructor(phoneNumber) {
    this._port = process.env.PHONE_SERVICE_PORT || 3334;
    this._phoneNumber = phoneNumber;
  }

  async getOperator() {
    const result = await axios.get(`http://localhost:${this._port}/${this._phoneNumber}`);
    return result.data;
  }
}

module.exports = MobileOperatorDetector;
