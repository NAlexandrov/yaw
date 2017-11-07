import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Modal } from 'antd';
import { Select, CardEdit, Input } from './';
import loading from './helpers/loading';

const CardLayout = styled.div`
	position: relative;
	width: 260px;
	height: 164px;
	box-sizing: border-box;
	margin-bottom: ${({ isSingle }) => (isSingle ? 0 : '15px')};
	padding: 25px 20px 20px 25px;
	border-radius: 4px;
	background-color: ${({ bgColor, active }) => (active ? bgColor : 'rgba(255, 255, 255, 0.1)')};
`;

const CardLogo = styled.div`
	height: 28px;
	margin-bottom: 25px;
	background-image: url(${({ url }) => url});
	background-size: contain;
	background-repeat: no-repeat;
	filter: ${({ active }) => (active ? 'none' : 'grayscale(100%) opacity(60%)')};
`;

const CardNumber = styled.div`
	margin-bottom: 20px;
	color: ${({ active, textColor }) => (active ? textColor : 'rgba(255, 255, 255, 0.6)')};
  font-size: 15px;
  white-space: nowrap;
	font-family: 'OCR A Std Regular';
`;

const CardType = styled.div`
	height: 26px;
	background-image: url(${({ url }) => url});
	background-size: contain;
	background-repeat: no-repeat;
	background-position-x: right;
	opacity: ${({ active }) => (active ? '1' : '0.6')};
`;

const NewCardLayout = styled(CardLayout)`
	background-color: transparent;
	background-image: url('/assets/cards-add.svg');
	background-repeat: no-repeat;
	background-position: center;
	box-sizing: border-box;
  border: 2px dashed rgba(255, 255, 255, 0.2);

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    cursor: pointer;
  }
`;

const CardSelect = styled(Select)`
	width: 100%;
	margin-bottom: 15px;
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
  color: #000;
  position: absolute;
  left: 20px;
`;

const InputCardNumber = styled(Input)`
  width: 52px;
  background-color: #fff;
  color: #000;
  border-color: #ddd;

  &:focus {
    outline: none;
    border-color: #bbb;
  }
`;

const InputBalance = styled(InputCardNumber)`
  width: 284px;
`;

/**
 * Карта
 */
class Card extends Component {
  /**
	 * Конструктор
	 *
	 * @param {Object} props свойства компонента
	 */
  constructor(props) {
    super(props);

    this.state = {
      activeCardIndex: 0,
      addCardModalVisible: false,
      card1: '',
      card2: '',
      card3: '',
      card4: '',
      balance: '',
    };
  }

  /**
	 * Обработчик переключения карты
	 *
	 * @param {Number} activeCardIndex индекс выбранной карты
	 */
  onCardChange(activeCardIndex) {
    this.setState({ activeCardIndex });
  }

  onAddCardClick() {
    this.setState({
      addCardModalVisible: true,
      card1: '',
      card2: '',
      card3: '',
      card4: '',
      balance: '',
    });
  }

  onChangeInput(event) {
    if (!event) {
      return;
    }

    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  onChangeCardNumber(event) {
    if (!event) {
      return;
    }

    const { value } = event.target;

    if (value.length > 4) {
      // console.log(this.card2);
    } else {
      this.onChangeInput(event);
    }
  }

  handleOk() {
    const { addCard } = this.props;
    const {
      card1, card2, card3, card4, balance,
    } = this.state;
    const cardNumber = `${card1}${card2}${card3}${card4}`;

    const hide = loading('Подождите, пожалуйста...');

    addCard({
      cardNumber,
      balance,
    }).then(() => {
      hide();
      this.setState({
        addCardModalVisible: false,
      });
    }).catch(() => hide());
  }

  handleCancel() {
    this.setState({
      addCardModalVisible: false,
    });
  }

  /**
   * Рендер компонента
   *
   * @override
   * @returns {JSX}
   */
  render() {
    const {
      data, type, active, isSingle, onClick, isCardsEditable, onChangeBarMode,
    } = this.props;

    if (type === 'new') {
      const { addCardModalVisible } = this.state;

      return (
        <div>
          <NewCardLayout onClick={() => this.onAddCardClick()} />
          <Modal
            title='Добавление новой карты'
            visible={addCardModalVisible}
            onOk={() => this.handleOk()}
            onCancel={() => this.handleCancel()}
            cancelText='Отмена'
            okText='Добавить'>
            <form>
              <InputField>
                <Label>Номер карты</Label>
                <InputCardNumber
                  ref={(input) => { this.card1 = input; }}
                  type='number'
                  name='card1'
                  required='required'
                  value={this.state.card1}
                  min='0'
                  max='9999'
                  maxlength='4'
                  autoFocus='autoFocus'
                  onChange={(event) => this.onChangeCardNumber(event)} />
                &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
                <InputCardNumber
                  ref={(input) => { this.card2 = input; }}
                  type='number'
                  name='card2'
                  required='required'
                  value={this.state.card2}
                  min='0'
                  max='9999'
                  maxlength='4'
                  onChange={(event) => this.onChangeCardNumber(event)} />
                &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
                <InputCardNumber
                  type='number'
                  name='card3'
                  required='required'
                  value={this.state.card3}
                  min='0'
                  max='9999'
                  maxlength='4'
                  onChange={(event) => this.onChangeCardNumber(event)} />
                &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
                <InputCardNumber
                  type='number'
                  name='card4'
                  required='required'
                  value={this.state.card4}
                  min='0'
                  max='9999'
                  maxlength='4'
                  onChange={(event) => this.onChangeCardNumber(event)} />
              </InputField>
              <InputField>
                <Label>Баланс</Label>
                <InputBalance
                  type='number'
                  name='balance'
                  required='required'
                  min='0'
                  value={this.state.balance}
                  placeholder='Нужно больше золота'
                  placeholderColor='#666'
                  onChange={(event) => this.onChangeInput(event)} />
              </InputField>
            </form>
          </Modal>
        </div >
      );
    }

    if (type === 'select') {
      const { activeCardIndex } = this.state;
      const selectedCard = data[activeCardIndex];
      const { bgColor, bankLogoUrl, brandLogoUrl } = selectedCard.theme;
      const isActive = true;

      return (
        <CardLayout active bgColor={bgColor} isCardsEditable={isCardsEditable} isSingle={isSingle}>
          <CardEdit editable={isCardsEditable} id={data.id} onChangeBarMode={onChangeBarMode} />
          <CardLogo url={bankLogoUrl} active />
          <CardSelect defaultValue='0' onChange={(index) => this.onCardChange(index)}>
            {data.map((card, index) => (
              <Select.Option key={isActive} value={`${index}`}>{card.number}</Select.Option>
            ))}
          </CardSelect>
          <CardType url={brandLogoUrl} active={isActive} />
        </CardLayout>
      );
    }

    const { number, theme, id } = data;
    const {
      bgColor, textColor, bankLogoUrl, brandLogoUrl,
    } = theme;

    let themedBrandLogoUrl;

    if (brandLogoUrl) {
      themedBrandLogoUrl = active ? brandLogoUrl : brandLogoUrl.replace(/-colored.svg$/, '-white.svg');
    }

    return (
      <CardLayout
        active={active}
        bgColor={bgColor}
        onClick={onClick}
        isCardsEditable={isCardsEditable}
        isSingle={isSingle}>

        <CardEdit editable={isCardsEditable} id={id} onChangeBarMode={onChangeBarMode} />
        <CardLogo url={bankLogoUrl} active={active} />
        <CardNumber textColor={textColor} active={active}>
          {number}
        </CardNumber>
        <CardType url={themedBrandLogoUrl} active={active} />
      </CardLayout>
    );
  }
}

Card.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  type: PropTypes.string,
  active: PropTypes.bool,
  isSingle: PropTypes.bool,
  isCardsEditable: PropTypes.bool,
  onClick: PropTypes.func,
  onChangeBarMode: PropTypes.func,
  addCard: PropTypes.func,
};

export default Card;
