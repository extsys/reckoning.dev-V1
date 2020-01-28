const path = require('path');
const kebabCase = require('lodash.kebabcase');
const _ = require(`lodash`);
require('dotenv');

const moment = require('moment-timezone');

const getDraftValue = ({ node, options }) => {
  const { fieldName, timezone } = options;
  if (!node.frontmatter) {
    return false;
  }

  if (node.frontmatter.hasOwnProperty(fieldName)) {
    return node.frontmatter[fieldName];
  }

  if (!node.frontmatter.date) {
    return false;
  }

  const dateNode = moment.tz(node.frontmatter.date, timezone);
  const dateNow = moment().tz(timezone);
  const value = dateNow.isSameOrBefore(dateNode);

  return value;
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;

  const options = {
    fieldName: 'draft',
    timezone: 'UTC',
    force: process.env.NODE_ENV === 'development' // if developmet, force to be NOT draft
  };

  if (node.internal.type !== 'Mdx') {
    return;
  }
  const fileNode = getNode(node.parent);
  const parsedFilePath = path.parse(fileNode.relativePath);
  const draft = getDraftValue({ node, options });

  if (
    Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
    Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
  ) {
    slug = `/${kebabCase(node.frontmatter.title)}/`;
  } else if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
    slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
  } else if (parsedFilePath.dir === '') {
    slug = `/${parsedFilePath.name}/`;
  } else {
    slug = `/${parsedFilePath.dir}/`;
  }

  if (Object.prototype.hasOwnProperty.call(node, 'frontmatter')) {
    if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug'))
      slug = `/${node.frontmatter.slug}/`;
    if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'date')) {
      const date = new Date(node.frontmatter.date);

      createNodeField({
        node,
        name: 'date',
        value: date.toISOString()
      });
    }
  }
  createNodeField({ node, name: 'slug', value: slug });
  createNodeField({
    node,
    name: options.fieldName,
    value: options.force === true ? false : draft
  });
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const postPage = path.resolve('src/templates/post.js');
    const pagePage = path.resolve('src/templates/page.js');
    const tagPage = path.resolve('src/templates/tag.js');
    const categoryPage = path.resolve('src/templates/category.js');

    resolve(
      graphql(
        `
          {
            allMdx(
              filter: { fields: { draft: { eq: false } } }
              sort: { order: DESC, fields: [frontmatter___date, fields___slug] }
              limit: 10000
            ) {
              edges {
                node {
                  id
                  frontmatter {
                    tags
                    categories
                    template
                    draft
                  }
                  fields {
                    slug
                  }
                  body
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const tagSet = new Set();
        const categorySet = new Set();

        const blogPosts = _.filter(result.data.allMdx.edges, edge => {
          if (edge.node.frontmatter.template === 'post') {
            return edge;
          }
          return undefined;
        });

        // Create blog-post pages.
        blogPosts.forEach((edge, index) => {
          let next = index === 0 ? null : blogPosts[index - 1].node;

          const prev = index === blogPosts.length - 1 ? null : blogPosts[index + 1].node;

          createPage({
            path: edge.node.fields.slug,
            component: postPage,
            context: {
              slug: edge.node.fields.slug,
              prev,
              next
            }
          });
        });

        result.data.allMdx.edges.forEach(edge => {
          if (edge.node.frontmatter.tags) {
            edge.node.frontmatter.tags.forEach(tag => {
              tagSet.add(tag);
            });
          }

          if (edge.node.frontmatter.categories) {
            edge.node.frontmatter.categories.forEach(category => {
              categorySet.add(category);
            });
          }

          if (edge.node.frontmatter.template === 'page') {
            createPage({
              path: edge.node.fields.slug,
              component: pagePage,
              context: {
                slug: edge.node.fields.slug
              }
            });
          }
        });

        const tagList = Array.from(tagSet);
        tagList.forEach(tag => {
          createPage({
            path: `/tags/${kebabCase(tag)}/`,
            component: tagPage,
            context: {
              tag
            }
          });
        });

        const categoryList = Array.from(categorySet);
        categoryList.forEach(category => {
          createPage({
            path: `/categories/${kebabCase(category)}/`,
            component: categoryPage,
            context: {
              category
            }
          });
        });
      })
    );
  });
};
