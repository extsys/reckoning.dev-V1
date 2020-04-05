import styled from '@emotion/styled';
import mediaqueries from '@styles/media';

const Paragraph = styled.p`
  line-height: 1.756;
  font-size: 18px;
  color: ${p => p.theme.colors.articleText};
  font-family: ${p => p.theme.fonts.sansSerif};
  transition: ${p => p.theme.colorModeTransition};
  margin: 0 auto 35px;
  width: 100%;
  max-width: 980px;

  b {
    font-weight: 800;
  }

  ${mediaqueries.desktop`
    max-width: 807px;
  `}

  ${mediaqueries.tablet`
    max-width: 526px;
    margin: 0 auto 5px;
  `};

  ${mediaqueries.phablet`
    padding: 0 20px;
  `};
`;

export default Paragraph;
