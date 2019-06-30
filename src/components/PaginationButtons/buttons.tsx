import styled from 'styled-components';
export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PrevPage = styled.div`
  min-width: 32px;
  a {
    width: 32px;
    height: 32px;
    color: '#292929';
    border-radius: 50%;
    background-color: #f3f3f3;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.15s ease-in-out;
    svg {
      display: block;
    }
    &:hover {
      color: #fff;
      background-color: '#D10068';
    }
  }
`;

export const NextPage = styled.div`
  min-width: 32px;
  a {
    width: 32px;
    height: 32px;
    color: '#292929';
    border-radius: 50%;
    background-color: #f3f3f3;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.15s ease-in-out;
    svg {
      display: block;
    }
    &:hover {
      color: #fff;
      background-color: '#D10068';
    }
  }
`;
