import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import axios from 'axios';

import loading from './helpers/loading';
import errorHandler from './helpers/errorHandler';
import { Island, Title, Button, Input } from './';

const MobilePaymentLayout = styled(Island)`
	width: 440px;
	background: #108051;
`;

const MobilePaymentTitle = styled(Title)`
	color: #fff;
`;

const InputField = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 26px;
	position: relative;
	padding-left: 150px;
`;

const Label = styled.div`
	font-size: 15px;
	color: #fff;
	position: absolute;
	left: 0;
`;

const Currency = styled.span`
	font-size: 13px;
	color: #fff;
	margin-left: 12px;
`;

const Commission = styled.div`
	color: rgba(255, 255, 255, 0.6);
	font-size: 13px;
	text-align: right;
	margin: 35px 0 20px;
`;

const Underline = styled.div`
	height: 1px;
	margin-bottom: 20px;
	background-color: rgba(0, 0, 0, 0.16);
`;

const PaymentButton = styled(Button)`
  float: right;
`;

const InputPhoneNumber = styled(Input)`
	width: 225px;
`;

const InputSum = styled(Input)`
	width: 160px;
`;

const InputCommision = styled(Input)`
	cursor: no-drop;
	width: 160px;
	border: dotted 1.5px rgba(0, 0, 0, 0.2);
	background-color: initial;
`;

/**
 * Компонент MobilePaymentContract
 */
class MobilePaymentContract extends Component {
  /**
	 * Конструктор
	 * @param {Object} props свойства компонента MobilePaymentContract
	 */
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      sum: 500,
      commission: 3,
      submitDisabled: true,
    };
  }

  /**
	 * Отправка формы
	 * @param {Event} event событие отправки формы
	 */
  onSubmitForm(event) {
    if (event) {
      event.preventDefault();
    }

    const { sum, phoneNumber, commission } = this.state;
    const isNumber = !isNaN(parseFloat(sum)) && isFinite(sum);

    if (!isNumber || Number(sum) === 0) {
      return errorHandler('Введите корректную сумму пополнения');
    }

    const { activeCard } = this.props;

    if (activeCard.balance < Number(sum)) {
      return errorHandler('У вас недостаточно средств');
    }

    let phoneNum = phoneNumber.match(/\d/g);

    if (!phoneNum) {
      return errorHandler('Введен некорректный номер телефона');
    }

    phoneNum = phoneNum.join('');

    if (phoneNum.length === 10) {
      phoneNum = `7${phoneNum}`;
    }

    const hide = loading('Подождите...');

    return axios
      .post(`/cards/${activeCard.id}/pay`, {
        phoneNumber: phoneNum,
        sum,
      })
      .then((res) => {
        hide();

        const { id, sum: summa, data: phone = {} } = res.data;
        const transaction = Object.assign({}, phone, {
          id,
          sum: summa,
          commission,
        });

        this.props.onPaymentSuccess(transaction);
      })
      .catch(errorHandler(hide));
  }

  /**
	 * Обработка изменения значения в input
	 * @param {Event} event - событие изменения значения input
	 */
  onChangeInputValue(event) {
    if (!event) {
      return;
    }

    const { name, value } = event.target;

    this.setState({
      [name]: value,
      submitDisabled: !(this.isValid(value) && this.isValidPhone()),
    });
  }

  /**
   * Обработка изменения значения в input phoneNumber
   * @param {Event} event - событие изменения
   */
  onChangePhoneNumber(event) {
    if (!event) {
      return;
    }

    const { name, value } = event.target;

    this.setState({
      [name]: value,
      submitDisabled: !(this.isValid() && this.isValidPhone(value)),
    });
  }

  /**
   * Получить цену с учетом комиссии
   * @returns {Number}
   */
  getSumWithCommission() {
    const { sum, commission } = this.state;

    const isNumber = !isNaN(parseFloat(sum)) && isFinite(sum);
    if (!isNumber || sum <= 0) {
      return 0;
    }

    return Number(sum) + Number(commission);
  }

  isValid(value) {
    const sum = value || this.state.sum;
    const { activeCard } = this.props;
    const isNumber = !isNaN(parseFloat(sum)) && isFinite(sum);

    if (!isNumber || Number(sum) <= 0) {
      return false;
    }

    if (activeCard.balance < Number(sum)) {
      return false;
    }

    return true;
  }

  isValidPhone(value) {
    const phoneNumber = value || String(this.state.phoneNumber);
    let numbers = phoneNumber.match(/\d/g);

    if (!numbers) {
      return false;
    }

    numbers = numbers.map((v) => parseInt(v, 10));

    if (numbers.length === 10) {
      return numbers[0] === 9;
    }

    return numbers.length === 11 && numbers[0] === 7 && numbers[1] === 9;
  }

  /**
	 * Рендер компонента
	 *
	 * @override
	 * @returns {JSX}
	 */
  render() {
    const { commission, submitDisabled } = this.state;

    return (
      <MobilePaymentLayout>
        <form onSubmit={(event) => this.onSubmitForm(event)}>
          <MobilePaymentTitle>Пополнить телефон</MobilePaymentTitle>
          <InputField>
            <Label>Телефон</Label>
            <InputPhoneNumber
              name='phoneNumber'
              required='required'
              value={this.state.phoneNumber}
              placeholder='Введите номер телефона'
              onChange={(event) => this.onChangePhoneNumber(event)} />
          </InputField>
          <InputField>
            <Label>Сумма</Label>
            <InputSum
              name='sum'
              type='number'
              min='1'
              required='required'
              step='any'
              value={this.state.sum}
              onChange={(event) => this.onChangeInputValue(event)} />
            <Currency>₽</Currency>
          </InputField>
          <InputField>
            <Label>Спишется</Label>
            <InputCommision value={this.getSumWithCommission()} readOnly />
            <Currency>₽</Currency>
          </InputField>
          <Commission>Размер коммиссии составляет {commission} ₽</Commission>
          <Underline />
          <PaymentButton bgColor='#fff' textColor='#108051' disabled={submitDisabled}>Пополнить</PaymentButton>
        </form>
      </MobilePaymentLayout>
    );
  }
}

MobilePaymentContract.propTypes = {
  activeCard: PropTypes.shape({
    id: PropTypes.number,
    balance: PropTypes.number.isRequired,
  }).isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
};

export default MobilePaymentContract;
