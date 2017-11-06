
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Gravatar from 'react-gravatar';
import { Icon } from 'antd';

const User = styled.div`
	display: flex;
	align-items: center;
	font-size: 15px;
	color: #000;
`;

const UserInfo = ({ user }) => (
  <User>
    <Gravatar email={user.email} size={42} default='mm' />
    {user.name || user.login} &nbsp;
    <a href='/logout'>
      <Icon type='logout' style={{ fontSize: 16, color: '#08c' }} />
    </a>
  </User>
);

UserInfo.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default UserInfo;
