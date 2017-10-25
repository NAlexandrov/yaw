import React from 'react';
import CardsBar from '../../source/client/components/CardsBar';

const cardsList = [{
  id: 1,
  cardNumber: '546925000000000',
  balance: '231310',
}];

const activeCardIndex = 1;

const onCardChange = jest.fn();

describe('<CardsBar />', () => {
  test('should render a cards bar', () => {
    const wrapper = shallow(
      <CardsBar
        cardsList={cardsList}
        activeCardIndex={activeCardIndex}
        onCardChange={onCardChange}
        isCardsEditable={false}
        isCardRemoving={false}
        deleteCard={() => ({})}
        onChangeBarMode={() => ({})} />);

    expect(wrapper).toMatchSnapshot();
  });
});
