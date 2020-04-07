import styled from '@emotion/styled';
import mediaqueries from '@styles/media';

const Blockquote = styled.blockquote`
  transition: ${(p) => p.theme.colorModeTransition};
  margin: 15px auto 50px;
  background: ${(p) => p.theme.colors.track};
  color: ${(p) => p.theme.colors.articleText};
  border-left: 8px solid #78c0a8;
  border-radius: 4px;
  font-weight: 500;
  padding: 1rem;
  line-height: 1.6;
  max-width: 980px;
  width: 100%;

  cite {
    display: block;
    margin-top: 1rem;
    font-size: 1.1rem;
    text-align: right;
    font-family: -apple-system, BlinkMacSystemFont, 'Roboto', Helvetica Neue, Helvetica, Arial,
      sans-serif;
    color: ${(p) => p.theme.colors.articleText};
  }

  code {
    margin: 1rem 0 0;
  }

    ${mediaqueries.tablet`
      font-size: 26px;
    `};

    ${mediaqueries.phablet`
      font-size: 36px;
    `};
  }
`;

export default Blockquote;
