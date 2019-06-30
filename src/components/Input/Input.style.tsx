import styled from 'styled-components';

const InputWrapper = styled.div`
  position: relative;
  > div {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    > label {
      color: '#292929';
      font-size: 15px;
      line-height: '1';
      font-weight: '500';
    }
  }

  .notification {
    display: block;
    color: #d8000c;
    font-size: 14px;
    padding-top: 0.5em;
  }

  .inner-wrap {
    width: 100%;
    margin-top: 15px;
    box-sizing: border-box;
    position: relative;

    &:only-child {
      margin: 0;
    }

    input,
    textarea,
    input[type='text'],
    input[type='email'],
    input[type='number'],
    input[type='password'] {
      appearance: none;
      width: 100%;
      height: 44px;
      border: 1px solid '#DBDBDB';
      color: '#292929';
      font-size: 15px;
      line-height: '1.5';
      font-weight: '400';
      padding: 0 15px;
      box-sizing: border-box;
      border-radius: 0;
      transition: border-color 0.25s ease;

      &:hover,
      &:focus {
        outline: 0;
      }

      &:focus {
        border-color: '#292929';
      }

      &::placeholder {
        color: '#292929';
      }
    }

    input[type='number'] {
      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    textarea {
      height: auto;
      min-height: 230px;
      padding-top: 15px;
      resize: none;
    }
  }

  &.disabled {
    .inner-wrap {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  &.with-search-icon {
    .inner-wrap {
      position: relative;

      .search-icon {
        width: 45px;
        height: 100%;
        font-size: 15px;
        color: '#292929';
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;

        &.right {
          right: 0;
          left: auto;
        }
      }

      .icon-left {
        padding-left: 50px;
      }

      .icon-right {
        padding-right: 50px;
      }
    }
  }

  &.is-material {
    label {
      position: absolute;
      left: 15px;
      color: '#767676';
      font-weight: 400;
      top: 3px;
      transition: all 0.2s ease;
    }

    input,
    textarea,
    input[type='text'],
    input[type='email'],
    input[type='number'],
    input[type='password'] {
      border-radius: 0;
      border-top: 0;
      border-left: 0;
      border-right: 0;
      padding-left: 15px;
      padding-right: 15px;
      height: auto;
      background: transparent;
      border-color: '#292929';
    }

    textarea {
      min-height: 40px;
      padding-bottom: 0;
    }

    .highlight {
      position: absolute;
      height: 1px;
      top: auto;
      left: 50%;
      bottom: 0;
      width: 0;
      pointer-events: none;
      transition: all 0.2s ease;
    }

    /* If input has icon then these styel */
    &.icon-left,
    &.icon-right {
      .field-wrapper {
        flex-direction: row-reverse;
        > .input-icon {
          width: auto;
        }
        > input {
          flex: 1;
        }
      }
    }

    /* When icon position in left */
    &.icon-left {
      .field-wrapper {
        > input {
          padding-left: 20px;
        }
      }
      label {
        top: -15px;
        font-size: 12px;
      }
    }

    /* When icon position in right */
    &.icon-right {
      .field-wrapper {
        > input {
          padding-right: 20px;
        }
      }
    }

    /* Material input focus style */
    &.is-focus {
      input {
        border-color: '#ebebeb';
      }

      label {
        top: -10px;
        font-size: 12px;
        color: '#484848';
      }

      .highlight {
        width: 100%;
        height: 2px;
        left: 0;
      }
    }
  }
`;

export default InputWrapper;
