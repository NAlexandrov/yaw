'use strict';

const request = require('request-promise-native');

const xinitUrl = 'http://xinit.ru/def/';
const j = request.jar();

class Phone {
  constructor(phoneNumber) {
    this._phoneNumber = phoneNumber;
  }

  async getOperator() {
    const phoneNumber = this._phoneNumber;

    await request({
      method: 'get',
      url: xinitUrl,
      jar: j,
    });

    let token;

    j.getCookies(xinitUrl).forEach((c) => {
      if (c.key === 'XSRF-TOKEN') {
        token = c.value;
      }
    });

    const result = await request({
      method: 'post',
      url: xinitUrl,
      jar: j,
      json: {
        action: 'defineCity',
        phone: String(phoneNumber),
      },
      headers: {
        'X-XSRF-TOKEN': token,
      },
    });

    if (result.mnp) {
      const { name, city } = result.mnp;

      return {
        name,
        city,
      };
    }

    if (result.ru.length) {
      const { provider: name, city } = result.ru[0];

      return {
        name,
        city,
      };
    }

    return new Error('Operator not found');
  }
}

module.exports = Phone;
