import React from 'react';
import UserInfo from '../../source/client/components/UserInfo';

describe('<UserInfo />', () => {
  test('should render an avatar', () => {
    const user = {
      login: 'admin',
    };

    const wrapper = shallow(<UserInfo user={user} />);
    expect(wrapper).toMatchSnapshot();
  });
});
