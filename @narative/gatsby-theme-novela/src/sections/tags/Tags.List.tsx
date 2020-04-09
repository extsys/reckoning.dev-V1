import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import mediaqueries from '@styles/media';

interface TagsListProps {
  tags: string[];
}

const TagsList: React.FC<TagsListProps> = ({ tags }) => {
  return (
    <div>
      {tags.map((tag, index) => {
        return (
          <List key={index}>
            <ListItem tag={tag} />
          </List>
        );
      })}
    </div>
  );
};

export default TagsList;

// TODO: I don't know what is better code?! maybe create some interface?
// eg. ITags{tags:[ITag]} & ITag{tag:string, path:string}
function slugify(string, base) {
  const slug = string
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  return `${base}/${slug}`.replace(/\/\/+/g, '/');
}

const ListItem: React.FC<string> = ({ tag }) => {
  // TODO: I don't know what is better code?! maybe create some interface?
  // eg. ITags{tags:[ITag]} & ITag{tag:string, path:string}
  const tagPath = slugify(tag, '/tag');

  // MARK: You can implements better UI.
  return (
    <TagLink to={tagPath}>
      <TagBox>{tag}</TagBox>
    </TagLink>
  );
};

const List = styled.div`
  display: inline-grid;
  max-width: 100%;
`;

const TagLink = styled(Link)`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
  height: 100%;
  margin: 4px 4px;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  &:hover,
  &:focus {
    color: ${(p) => p.theme.colors.accent};
  }

  ${mediaqueries.phablet`
    &:active {
      transform: scale(0.97) translateY(3px);
    }
  `}
`;

const TagBox = styled.div`
  display: flow-root;
  height: 24px;
  line-height: 24px;
  position: relative;
  margin: 0 4px 4px 0;
  padding: 0 10px 0 12px;
  background-color: ${(p) => p.theme.colors.tagBackground};
  -webkit-border-bottom-right-radius: 3px;
  border-bottom-right-radius: 3px;
  -webkit-border-top-right-radius: 3px;
  border-top-right-radius: 3px;
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  color: ${(p) => p.theme.colors.tagText};
  font-size: 12px;
  font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, sans-serif;
  text-decoration: none;
  text-overflow: ellipsis;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  font-weight: bold;
  white-space: nowrap;
`;
