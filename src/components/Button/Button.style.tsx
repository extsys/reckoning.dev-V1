import styled from 'styled-components';

type ButtonStyleProps = {
  fullwidth?: boolean;
};

const ButtonStyle = styled('button')<ButtonStyleProps>`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: '#fff';
  background-color: '#292929';
  height: 44px;
  width: ${props => (props.fullwidth ? '100%' : 'auto')};
  font-family: "'Fira Sans', sans-serif";
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 27px;
  padding-right: 27px;
  border: 0;
  transition: all 0.3s ease;
  span.btn-text {
    padding-left: 4px;
    padding-right: 4px;
  }
  span.btn-icon {
    display: flex;
    > div {
      display: flex !important;
    }
  }

  &:focus {
    outline: none;
  }

  &.disabled {
    color: '#767676';
    background-color: '#e6e6e6';
    border-color: '#e6e6e6';

    &:hover {
      color: '#767676';
      background-color: '#e6e6e6';
      border-color: '#e6e6e6';
    }
  }

  &.is-loading {
    .btn-text {
      padding-left: 8px;
      padding-right: 8px;
    }
  }
`;

ButtonStyle.displayName = 'ButtonStyle';

export default ButtonStyle;
