'use strict';

module.exports = (type) => {
  switch (type) {
    case 'paymentMobile': return 'Оплата телефона';
    case 'prepaidCard': return 'Пополнение с карты';
    case 'withdrawCard': return 'Перевод на карту';
    default: return 'Операция';
  }
};
