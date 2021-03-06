import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MobilePaymentContract from './MobilePaymentContract';
import MobilePaymentSuccess from './MobilePaymentSuccess';

/**
 * Класс компонента MobilePayment
 */
class MobilePayment extends Component {
  /**
	 * Конструктор
	 * @param {Object} props свойства компонента MobilePayment
	 */
  constructor(props) {
    super(props);

    this.state = { stage: 'contract' };
  }

  /**
	 * Обработка успешного платежа
	 * @param {Object} transaction данные о транзакции
	 */
  onPaymentSuccess(transaction) {
    this.props.onTransaction();
    this.setState({
      stage: 'success',
      transaction,
    });
  }

  /**
	 * Повторить платеж
	 */
  repeatPayment() {
    this.setState({ stage: 'contract' });
  }

  /**
	 * Рендер компонента
	 *
	 * @override
	 * @returns {JSX}
	 */
  render() {
    const { activeCard, user } = this.props;

    if (this.state.stage === 'success') {
      return (
        <MobilePaymentSuccess
          user={user}
          activeCard={activeCard}
          transaction={this.state.transaction}
          repeatPayment={() => this.repeatPayment()} />
      );
    }

    return (
      <MobilePaymentContract
        activeCard={activeCard}
        onPaymentSuccess={(transaction) => this.onPaymentSuccess(transaction)} />
    );
  }
}

MobilePayment.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
  activeCard: PropTypes.shape({
    id: PropTypes.number,
    theme: PropTypes.object,
  }).isRequired,
  onTransaction: PropTypes.func.isRequired,
};

export default MobilePayment;
