import React from 'react';

function slugify(string) {
  const slug = string
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  return `${slug}`;
}

export default ({ headings }) => {
  var html_string = '<ul>';
  var prev = 1;
  {
    headings
      .filter(heading => heading.depth !== 1 && heading.depth <= 3)
      .map(heading => {
        const close = heading.depth === 2 && prev !== 1 ? '</li>' : '';
        html_string = html_string + close;
        const tail =
          heading.depth === 2
            ? '<li key="' +
              heading.value +
              '"><a href=#' +
              slugify(heading.value) +
              '>' +
              heading.value +
              '</a>'
            : '<ul><li key="' +
              heading.value +
              '"><a href=#' +
              slugify(heading.value) +
              '>' +
              heading.value +
              '</a></li></ul>';

        html_string = html_string + tail;
        prev = heading.depth;
        return '';
      });
  }
  html_string = html_string + '</ul>';
  return <div className='toc' dangerouslySetInnerHTML={{ __html: html_string }} />;
};
