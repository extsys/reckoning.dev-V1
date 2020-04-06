import React from 'react';
import styled from '@emotion/styled';

import mediaqueries from '@styles/media';

import { Icon } from '@types';

const Logo: Icon = ({ fill = 'white' }) => {
  return (
    <LogoContainer>
      <svg
        width="60"
        height="23"
        viewBox="0 0 60 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="Logo__Desktop"
      >
        <g clipPath="url(#clip0)">
          <path
            d="M11.5 0L0 11.5L11.5 23.0L18.1 23.0L6.6 11.5L18.1 0Z"
            fill={fill}
          />
          <path d="M22.1 23.0L27.7 23.0L35.6 0.0L 30.0 0.0Z" fill={fill} />
          <path
            d="M39.6 0L46.2 0.0L57.7 11.5L46.2 23.0L39.6 23.0L51.1 11.5Z"
            fill={fill}
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="191.156" height="23" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <svg
        width="60"
        height="23"
        viewBox="0 0 60 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="Logo__Mobile"
      >
        <path
          d="M11.5 0L0 11.5L11.5 23.0L18.1 23.0L6.6 11.5L18.1 0Z"
          fill={fill}
        />
        <path d="M22.1 23.0L27.7 23.0L35.6 0.0L 30.0 0.0Z" fill={fill} />
        <path
          d="M39.6 0L46.2 0.0L57.7 11.5L46.2 23.0L39.6 23.0L51.1 11.5Z"
          fill={fill}
        />
      </svg>
    </LogoContainer>
  );
};

export default Logo;

const LogoContainer = styled.div`
  .Logo__Mobile {
    display: none;
  }

  ${mediaqueries.tablet`
    .Logo__Desktop {
      display: none;
    }

    .Logo__Mobile{
      display: block;
    }
  `}
`;
