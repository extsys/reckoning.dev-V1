import styled from 'styled-components';

export const BlogPostFooter = styled.div`
  margin: 0 auto;
  width: 1270px;
  max-width: 100%;
  padding-top: 10px;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 990px) {
    padding-top: 40px;
  }
`;

export const BlogPostComment = styled.div`
  margin: 0 auto;
  width: 870px;
  max-width: 100%;
  padding-top: 80px;
  @media (max-width: 990px) {
    padding-top: 60px;
  }
`;

export const PostShare = styled.div`
  display: flex;
  align-items: center;
  > span {
    flex-shrink: 0;
  }
  > div,
  .SocialMediaShareButton {
    cursor: pointer;
    margin-left: 15px;
    font-size: 22px;
    outline: 0;
    color: '#292929';
    transition: 0.15s ease-in-out;
    @media (max-width: 767px) {
      font-size: 18px;
      margin-left: 10px;
    }
    &:hover {
      color: '#D10068';
    }
    svg {
      display: block;
    }
  }
`;
export const BlogPostDetailsWrapper = styled.div`
  margin: 0 auto;
  padding: 90px 0 120px 0;
  @media (min-width: 990px) {
    width: 900px;
  }
  @media (min-width: 1200px) {
    width: 1050px;
  }
  @media (min-width: 1400px) {
    width: 1170px;
  }
  @media (max-width: 990px) {
    padding: 80px 45px 0 45px;
  }
  @media (max-width: 575px) {
    padding: 60px 25px 0 25px;
  }
`;
export const PostTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @media (max-width: 575px) {
    display: none;
  }

  a {
    display: block;
    margin-right: 30px;
    font-size: 14px;
    font-weight: 400;
    color: '#D10068';
    @media (max-width: 990px) {
      font-size: 13px;
      margin-right: 25px;
    }
  }
`;
