import React from 'react';
import { IoMdArrowRoundUp } from 'react-icons/io';

interface ScrollUpButtonProps {}

const ScrollUpButton: React.FunctionComponent<ScrollUpButtonProps> = props => {
  return (
    <div className='scrollup-button' {...props}>
      <IoMdArrowRoundUp />
    </div>
  );
};

export default ScrollUpButton;
