import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const StyledButton = styled.button`
	height: 36px;
	width: 120px;
	font-size: 13px;
	font-weight: 600;
	border: none;
	border-radius: 3px;
	cursor: pointer;
	background-color: ${({ bgColor }) => bgColor};
	color: ${({ textColor }) => textColor};

	&:focus,
	&:hover {
		background-color: ${({ bgColor }) => bgColor};
		color: ${({ textColor }) => textColor};
  }
`;

const DisabledButton = styled(StyledButton)`
  cursor: auto !important;
`;

// eslint-disable-next-line
class Button extends Component {
  render() {
    const {
      bgColor, textColor, children, className, onClick, disabled,
    } = this.props;

    if (disabled) {
      return (
        <DisabledButton bgColor='#ccc' textColor='#999' className={className} disabled>
          {children}
        </DisabledButton>
      );
    }

    return (
      <StyledButton bgColor={bgColor} textColor={textColor} className={className} onClick={onClick}>
        {children}
      </StyledButton>
    );
  }
}

Button.propTypes = {
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  bgColor: 'rgba(0, 0, 0, 0.05)',
  textColor: 'rgba(0, 0, 0, 0.65)',
  disabled: false,
};

export default Button;
