import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import styled from '@emotion/styled';
import mediaqueries from '@styles/media';

function slugify(string) {
  const slug = string
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  return `${slug}`;
}

function createDataObject(heading) {
  return {
    link: '#' + slugify(heading.value),
    name: heading.value,
    values: [],
  };
}

function ListItem({ item }) {
  let children = null;
  if (item.values && item.values.length) {
    children = (
      <ul>
        {item.values.map((i) => (
          <ListItem item={i} key={i.name} />
        ))}
      </ul>
    );
  }

  return (
    <li key={item.name}>
      <AnchorLink offset="100" href={item.link}>
        {item.name}
      </AnchorLink>
      {children}
    </li>
  );
}

export default ({ headings }) => {
  var data = [];
  headings
    .filter((heading) => heading.depth !== 1 && heading.depth <= 3)
    .map((heading) => {
      return heading.depth === 2
        ? data.push(createDataObject(heading))
        : data[data.length - 1].values.push(createDataObject(heading));
    });
  return (
    <TOCDiv>
      <ul>
        {data.map((i) => (
          <ListItem item={i} key={i.name} />
        ))}
      </ul>
    </TOCDiv>
  );
};

const TOCDiv = styled.div`
  color: ${(p) => p.theme.colors.primary};
  background: ${(p) => p.theme.colors.tocBackground};
  border-radius: 4px;
  box-shadow: 3px 5px 20px ${(p) => p.theme.colors.tocBackground};
  margin-bottom: 2em;
  padding: 1.1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto 35px;
  width: 100%;
  max-width: 980px;
  font-weight: 600;

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

  a {
    color: ${(p) => p.theme.colors.tocLinkColor};
    &:hover,
    &:active,
    &:focus {
      color: ${(p) => p.theme.colors.tocLinkFocusColor};
      background: transparent;
    }
  }

  li {
    list-style-type: square;
    list-style-position: inside;
    font-size: 1.25em;
    margin: 10px 10px;
  }
  ul {
    margin: 0 0 0.5rem 0;
  }
  ul li ul {
    margin: 0 0 0 0;
  }

  ul li:before {
    content: '';
    position: absolute;
    margin-left: 20px;
  }

  li ul li {
    list-style-type: circle;
    list-style-position: inside;
    font-size: 0.95em;
  }
`;
