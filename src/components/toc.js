import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

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
  return { link: '#' + slugify(heading.value), name: heading.value, values: [] };
}

function ListItem({ item }) {
  let children = null;
  if (item.values && item.values.length) {
    children = (
      <ul>
        {item.values.map(i => (
          <ListItem item={i} key={i.name} />
        ))}
      </ul>
    );
  }

  return (
    <li key={item.name}>
      <AnchorLink offset='100' href={item.link}>
        {item.name}
      </AnchorLink>
      {children}
    </li>
  );
}

export default ({ headings }) => {
  var data = [];
  headings
    .filter(heading => heading.depth !== 1 && heading.depth <= 3)
    .map(heading => {
      heading.depth === 2
        ? data.push(createDataObject(heading))
        : data[data.length - 1].values.push(createDataObject(heading));
    });
  return (
    <div className='toc'>
      <ul>
        {data.map(i => (
          <ListItem item={i} key={i.name} />
        ))}
      </ul>
    </div>
  );
};
