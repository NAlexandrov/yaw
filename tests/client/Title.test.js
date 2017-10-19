import React from 'react';
import Title from '../../source/client/components/Title';

describe('<Title />', () => {
  test('should render a title', () => {
    const wrapper = shallow(<Title />);
    expect(wrapper).toMatchSnapshot();
  });
});
