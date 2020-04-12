import React from 'react';

import { Icon } from '@types';
import styled from '@emotion/styled';

import mediaqueries from '@styles/media';

const StatsLogo: Icon = ({ fill = '#000' }) => {
  return (
    <LogoContainer>
      <svg
        width="24"
        height="24"
        enable-background="new 0 0 512.001 512.001"
        viewBox="0 0 512.001 512.001"
        xmlns="http://www.w3.org/2000/svg"
        className="Logo"
      >
        <path
          fill={fill}
          d="m21.4 432.5h76.1c5.8 0 10.4-4.7 10.4-10.4v-306.1c0-5.8-4.7-10.4-10.4-10.4h-76.1c-5.8 0-10.4 4.7-10.4 10.4v306.1c0 5.8 4.7 10.4 10.4 10.4zm10.5-306.1h55.2v285.2h-55.2z"
        />
        <path
          fill={fill}
          d="m152.5 432.5h76.1c5.8 0 10.4-4.7 10.4-10.4v-212.8c0-5.8-4.7-10.4-10.4-10.4h-76.1c-5.8 0-10.4 4.7-10.4 10.4v212.8c-.1 5.8 4.6 10.4 10.4 10.4zm10.4-212.7h55.2v191.9h-55.2z"
        />
        <path
          fill={fill}
          d="m283.5 432.5h76.1c5.8 0 10.4-4.7 10.4-10.4v-375.8c0-5.8-4.7-10.4-10.4-10.4h-76.1c-5.8 0-10.4 4.7-10.4 10.4v375.8c0 5.8 4.6 10.4 10.4 10.4zm10.4-375.8h55.2v355h-55.2z"
        />
        <path
          fill={fill}
          d="m490.6 152.7h-76.1c-5.8 0-10.4 4.7-10.4 10.4v259c0 5.8 4.7 10.4 10.4 10.4h76.1c5.8 0 10.4-4.7 10.4-10.4v-259c0-5.7-4.7-10.4-10.4-10.4zm-10.5 259h-55.2v-238.1h55.2z"
        />
        <path
          fill={fill}
          d="m490.6 455.3h-469.2c-5.8 0-10.4 4.7-10.4 10.4s4.7 10.4 10.4 10.4h469.1c5.8 0 10.4-4.7 10.4-10.4s-4.6-10.4-10.3-10.4z"
        />
      </svg>
    </LogoContainer>
  );
};

export default StatsLogo;

const LogoContainer = styled.div`
  ${mediaqueries.tablet`
  .Logo {
    display: inline-flex;
    transform: scale(0.708);
    margin-left: 10px;

    &:hover {
      opacity: 0.5;
    }
  `}
  }
`;
